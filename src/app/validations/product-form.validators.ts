import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ProductFormValidators {
  static priceValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value < 0) {
      return { invalidPrice: true };
    }
    return null;
  }
  static urlValidator(control: AbstractControl): ValidationErrors | null {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;

    if (control.value && !urlPattern.test(control.value)) {
      return { invalidUrl: true };
    }

    return null;
  }
}
