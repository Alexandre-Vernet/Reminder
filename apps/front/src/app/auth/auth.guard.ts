import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, map, of } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	return authService.signInWithAccessToken()
		.pipe(
			map(() => true),
			catchError(() => {
				state.url = '/auth/sign-in';
				router.navigate([state.url]);
				return of(false);
			})
		);
};
