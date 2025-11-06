import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, of, switchMap } from "rxjs";
import { FcmTokenService } from "../fcm-token/fcm-token.service";
import { AlertService } from "../utils/alert.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const alert = inject(AlertService);
  const fcmService = inject(FcmTokenService);

  return authService.signInWithAccessToken()
    .pipe(
      switchMap(user => {
        if (!user) {
          alert.setMessage('You need to sign in to access this page');
          router.navigateByUrl('/auth/sign-in');
          return of(false);
        }
        fcmService.requestFcmToken(user);

        return of(true);
      }),
      catchError((err) => {
        alert.setMessage(err?.error?.message ?? 'You need to sign in to access this page');
        router.navigateByUrl('/auth/sign-in');
        return of(false);
      })
    );
};
