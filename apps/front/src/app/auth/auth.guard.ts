import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, combineLatest, from, map, of, switchMap } from "rxjs";
import { environment } from "../../environments/environment";
import { SwPush } from "@angular/service-worker";
import { SubscriptionService } from "../subscription/subscription.service";
import { SubscriptionDto, UserDto } from "../../../../libs/interfaces";

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);
	const swPush = inject(SwPush);
	const subscriptionService = inject(SubscriptionService);

	return combineLatest([
		authService.signInWithAccessToken(),
		from(swPush.requestSubscription({
			serverPublicKey: environment.serverPublicKey
		}))
	])
		.pipe(
			switchMap(([user, subscription]: [UserDto, any]) => {
				if (environment.production) {
					const subscriptionData: SubscriptionDto = JSON.parse(JSON.stringify(subscription));
					const sub: SubscriptionDto = {
						expirationTime: null,
						endpoint: subscriptionData.endpoint,
						keys: {
							auth: subscriptionData.keys.auth,
							p256dh: subscriptionData.keys.p256dh
						},
						user
					}

					return subscriptionService.createSubscription(sub)
						.pipe(map(() => true))
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
