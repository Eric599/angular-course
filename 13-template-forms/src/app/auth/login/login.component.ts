import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // get form element
  private form = viewChild.required<NgForm>('loginForm');
  private destroyRef = inject(DestroyRef);

  constructor() {
    const savedForm = window.localStorage.getItem('saved-login-form');

    if (savedForm) {
      const loadedFormData = JSON.parse(savedForm);
      const savedEmail = loadedFormData.email;
      // this.form().setValue({
      //   email: savedEmail,
      //   password: ''
      // })
      // or like this for only updating one value
      // set timeout needs to be here or else it will be undefined, hacky as shit 
      setTimeout(() => {
        this.form().controls['email'].setValue(savedEmail);
      }, 1);
    }

    afterNextRender(() => {
      // value changes is an Observable!
      // debounce time makes it so it does not update on every letter entered
      const subscription = this.form()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe({
          // ater every key stroke
          next: (val) =>
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({ email: val.email }),
            ),
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    // check if email directive and minlength password directive failed
    if (formData.form.invalid) {
      return;
    }
    formData.form.value.email;
    formData.form.value.password;

    formData.form.reset();
  }
}
