import { Route } from '@angular/router';
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { NotificationComponent } from "./notification/notification.component";
import { authGuard } from "./auth/auth.guard";

export const appRoutes: Route[] = [
	{
		path: '',
		component: NotificationComponent,
		canActivate: [authGuard]
	},
	{
		path: 'auth',
		children: [
			{
				path: 'sign-in',
				component: SignInComponent
			},
			{
				path: 'sign-up',
				component: SignUpComponent
			}
		]
	}
];
