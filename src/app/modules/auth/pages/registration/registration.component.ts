import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ErrorMessages } from './error-messages';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessDataComponent } from './dialog-success-data/dialog-success-data.component';
import { Router } from '@angular/router';
import { User } from '../../../../core/models/user';
import { ApiService } from '../../../../core/services/api.service';

const minLengthPass = 8;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  formErrors = ErrorMessages;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      const user: User = {
        id: 0,
        name: this.registrationForm.controls.name.value,
        email: this.registrationForm.controls.email.value,
        login: '',
        password: this.registrationForm.controls.password.value,
        favorites: []
      };
      this.apiService.signUp(user).subscribe(() => {
        this.openDialog();
        this.router.navigateByUrl('/login');
      });
    }
  }

  public openDialog(): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(DialogSuccessDataComponent, {
      height: '200px',
      width: '600px',
      data: {}
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
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
