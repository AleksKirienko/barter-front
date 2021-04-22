import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ErrorMessages } from './error-messages';

const minLengthPass = 8;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  formErrors = ErrorMessages;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(minLengthPass),
        Validators.pattern(/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(){}":>?<~!"№;%:?*()]).{6,}/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.checkPasswords()
    });
  }

  public onSubmit(): void {
    if (this.registrationForm.valid) {
      alert('Registration complete!');
    }
  }

  private checkPasswords(): ValidatorFn {
    return (formGroup: FormGroup): ValidatorFn => {
      const control: AbstractControl = formGroup.controls.password;
      const matchingControl: AbstractControl = formGroup.controls.confirmPassword;

      if (matchingControl.errors) {
        if (!matchingControl.errors.misMatchPasswords) {
          return;
        }
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({misMatchPasswords: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}
