import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AutoFocus } from "primeng/autofocus";
import { FocusTrap } from "primeng/focustrap";
import { catchError, EMPTY, filter, Subject, switchMap, takeUntil } from "rxjs";
import { AuthService } from "../auth.service";
import { FloatLabel } from "primeng/floatlabel";
import { Router } from "@angular/router";

@Component({
	selector: 'app-sign-up',
	imports: [CommonModule, ButtonModule, InputText, FormsModule, AutoFocus, FocusTrap, ReactiveFormsModule, FloatLabel],
	templateUrl: './sign-up.component.html',
	styleUrl: './sign-up.component.scss',
	standalone: true,
})
export class SignUpComponent implements OnInit, OnDestroy {

	buttonSubmitForm$: Subject<void> = new Subject<void>();
	unsubscribe$: Subject<void> = new Subject<void>();

	formSignUp = new FormGroup({
		email: new FormControl<string>('', [Validators.email, Validators.required, Validators.maxLength(255)]),
		password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
		confirmPassword: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
	});

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router
	) {
	}

	ngOnInit() {
		this.buttonSubmitForm$.pipe(
			takeUntil(this.unsubscribe$),
			filter(() => this.checkForm()),
			switchMap(() => this.authService.signUp(this.formSignUp.value.email, this.formSignUp.value.password)
				.pipe(
					catchError(() => EMPTY)
				))
		)
			.subscribe({
				next: () => this.router.navigate(['/']),
				error: err => console.error('Could not sign up', err)
			})
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	private checkForm(): boolean {
		if (this.formSignUp.value.password !== this.formSignUp.value.confirmPassword) {
			this.formSignUp.setErrors({ passwordMismatch: true });
			return false;
		}

		return this.formSignUp.valid;
	}
}
