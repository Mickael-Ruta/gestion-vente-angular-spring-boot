import { AbstractControl, ValidationErrors } from '@angular/forms';

export function positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value !== null && value !== undefined && value < 0) {
    return { positiveNumber: true };
  }
  return null;
}
