import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const cronPartsLengthValidator = (): ValidatorFn => {
	return (control: AbstractControl): ValidationErrors | null => {

		const value: string = control.value;

		if (!value) {
			return null;
		}

		const cronExpression: string[] = value.split(' ');
		const cronExpressionLength = cronExpression.length;

		// Check if cron expression has 5 or 6 parts
		if (cronExpressionLength !== 5 && cronExpressionLength !== 6) {
			return { cronFormatInvalidLength: true };
		}

		return null;
	}
}
