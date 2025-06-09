import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

// Custom validator example
function containsQuestionMark(control: AbstractControl) {
  return control.value.includes('?')
    ? null
    : { doesNotContainQuestionMark: true };
}

// example of async validator
// must return promise or observable
function isEmailUnique(control: AbstractControl) {
  // use rxjs of() function to turn value into observable like shown below
  return control.value.includes('test@example.com')
    ? of({ notUniqueEmail: true })
    : of(null);
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [isEmailUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        containsQuestionMark,
      ],
    }),
  });

  get emailIsInvalid() {
    return (
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.invalid
    );
  }

  ngOnInit(): void {
    const savedForm = window.localStorage.getItem('login-form');

    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);
      // can use this patch to partially update
      this.loginForm.patchValue({
        email: loadedForm.email,
      });
    }

    const subscription = this.loginForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (val) => {
          window.localStorage.setItem(
            'login-form',
            JSON.stringify({ email: val.email }),
          );
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {}
}
