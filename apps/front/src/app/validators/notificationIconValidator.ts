import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const notificationIconValidator = (): ValidatorFn => {
	return (control: AbstractControl): ValidationErrors | null => {

		const value: string = control.value;

		if (!value) {
			return null;
		}

		if (!value.startsWith('https://') && !value.startsWith('http://')) {
			return { invalidStartNotificationIconURL: true };
		}

		if (!value.endsWith('.png') && !value.endsWith('.jpg') && !value.endsWith('.jpeg') && !value.endsWith('.svg') && !value.endsWith('.gif') && !value.endsWith('.webp')) {
			return { invalidEndNotificationIconURL: true };
		}



		return null;
	}
}
