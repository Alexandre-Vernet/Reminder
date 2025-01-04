import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, from, map, of, switchMap } from "rxjs";
import { environment } from "../../environments/environment";
import { SwPush } from "@angular/service-worker";
import { SubscriptionService } from "../subscription/subscription.service";

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);
	const swPush = inject(SwPush);
	const subscriptionService = inject(SubscriptionService);

	return authService.signInWithAccessToken()
		.pipe(
			switchMap(() => {
				if (environment.production) {
					return from(swPush.requestSubscription({
						serverPublicKey: environment.serverPublicKey
					}))
						.pipe(
							switchMap(subscription => subscriptionService.createSubscription(subscription)),
							map(() => true),
							catchError((err) => {
								console.error('Failed to subscribe to push notifications', err);
								return of(false);
							})
						)
				} else {
					return of(true);
				}
			}),
			catchError(() => {
				state.url = '/auth/sign-in';
				router.navigate([state.url]);
				return of(false);
			})
		);
}
