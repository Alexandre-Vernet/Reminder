import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, filter, Subject, switchMap, takeUntil } from "rxjs";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Button } from "primeng/button";
import { FocusTrap } from "primeng/focustrap";
import { InputText } from "primeng/inputtext";
import { FloatLabel } from "primeng/floatlabel";
import { Router, RouterLink } from "@angular/router";
import { AutoFocus } from "primeng/autofocus";

@Component({
	selector: 'app-sign-in',
	imports: [CommonModule, Button, FocusTrap, FormsModule, InputText, ReactiveFormsModule, FloatLabel, AutoFocus, RouterLink],
	templateUrl: './sign-in.component.html',
	styleUrl: './sign-in.component.scss',
	standalone: true,
})
export class SignInComponent implements OnInit, OnDestroy {

	buttonSubmitForm$: Subject<void> = new Subject<void>();
	unsubscribe$: Subject<void> = new Subject<void>();

	formSignIn = new FormGroup({
		email: new FormControl<string>('', [Validators.email, Validators.required, Validators.maxLength(255)]),
		password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
	});

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router
	) {
	}

	ngOnInit() {
		this.authService.signInWithAccessToken()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(() => this.router.navigate(['/']));

		this.buttonSubmitForm$.pipe(
			takeUntil(this.unsubscribe$),
			filter(() => this.formSignIn.valid),
			switchMap(() => this.authService.signIn(this.formSignIn.value.email, this.formSignIn.value.password)
				.pipe(
					catchError((err) => {
						this.formSignIn.setErrors({
							authError: err.error.message ?? 'Invalid credentials'
						});

						return EMPTY;
					})
				))
		)
			.subscribe({
				next: () => this.router.navigate(['/']),
				error: err => console.error('Could not sign in', err)
			})
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
