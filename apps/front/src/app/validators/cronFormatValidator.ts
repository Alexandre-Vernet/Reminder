import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const cronFormatValidator = (): ValidatorFn => {
	return (control: AbstractControl): ValidationErrors | null => {

		const value: string = control.value;

		if (!value) {
			return null;
		}

		const cronExpression: string[] = value.split(' ');
		const cronExpressionLength = cronExpression.length;

		// Cron must contain only numbers and special characters
		const regex = new RegExp(/^[0-9\/*,? -]+$/);
		for (let i = 0; i < cronExpressionLength; i++) {
			if (!regex.test(cronExpression[i])) {
				return { cronFormatInvalidContainsLetters: true };
			}
		}


		return null;
	}
}
