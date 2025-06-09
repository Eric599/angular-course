import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

type Roles = 'student' | 'teacher' | 'employee' | 'founder' | 'other';

// custom validator used to check password match
// uses a factory function to accept parameters so it is more generic
function equalValues(name1: string, name2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(name1)?.value;
    const val2 = control.get(name2)?.value;

    return val1 === val2 ? null : { passwordsDoNotMatch: true };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      { validators: [equalValues('password', 'confirmPassword')] },
    ),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    role: new FormControl<Roles>('student', {
      validators: [Validators.required],
    }),
    agree: new FormControl(false, { validators: [Validators.requiredTrue] }),
  });

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
  }

  onReset() {
    this.signUpForm.reset();
  }
}
