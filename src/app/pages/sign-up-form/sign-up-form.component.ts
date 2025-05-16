import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css',
  standalone: false
})
export class SignUpFormComponent {
  fb = inject(NonNullableFormBuilder);
  // signUpForm = this.fb.group({
  //   firstName: [''],
  //   lastName: [''],
  //   email: [''],
  //   password: [''],
  //   confirmPassword: ['']
  // });
}
