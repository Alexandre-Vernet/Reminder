import { Route } from '@angular/router';
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";

export const appRoutes: Route[] = [
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
