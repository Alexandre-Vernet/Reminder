import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, filter, Subject, switchMap } from "rxjs";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Button } from "primeng/button";
import { FocusTrap } from "primeng/focustrap";
import { InputText } from "primeng/inputtext";
import { FloatLabel } from "primeng/floatlabel";
import { Router, RouterLink } from "@angular/router";
import { AutoFocus } from "primeng/autofocus";
import { AlertService } from "../../utils/alert.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, Button, FocusTrap, FormsModule, InputText, ReactiveFormsModule, FloatLabel, AutoFocus, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  standalone: true,
})
export class SignInComponent implements OnInit {

  buttonSubmitForm$: Subject<void> = new Subject<void>();

  formSignIn = new FormGroup({
    email: new FormControl<string>(null, [Validators.email, Validators.required, Validators.maxLength(255)]),
    password: new FormControl<string>(null, [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    this.alertService.message$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(value => !!value)
      )
      .subscribe(message => {
        this.formSignIn.setErrors({
          authError: message
        });
      });

    this.buttonSubmitForm$.pipe(
      takeUntilDestroyed(this.destroyRef),
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
      .subscribe(() => this.router.navigate(['/']));
  }
}
