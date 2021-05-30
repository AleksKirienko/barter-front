import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

const minLengthPass = 8;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMsg = 'Поле обязательно для заполнения';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(minLengthPass)
      ]]
    });
  }

  public onSubmit(): void {
    const login = this.loginForm.controls.login.value;
    if (this.loginForm.valid) {
      this.authService.signIn(login);
      this.router.navigateByUrl('/home');
    }
  }

  public onBlur(control: string): void {
    this.loginForm.controls[control].updateValueAndValidity();
    if (this.loginForm.get('password').value.length < minLengthPass) {
      this.errorMsg = 'Минимум 8 символов';
    }
  }

}
