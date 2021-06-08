import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthGuard } from '../../../../core/services/auth.guard';
import { DialogMessagesComponent } from '../../../../shared/dialogs/dialog-messages/dialog-messages.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessages } from '../../../../shared/dialog-messages';

const minLengthPass = 8;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMsg = 'Поле обязательно для заполнения';
  dialogMessages = DialogMessages;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private authGuard: AuthGuard,
    private dialog: MatDialog,
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
    if (this.loginForm.valid) {
      const values = this.loginForm.value;
      let userId: number;
      this.authService.signIn(values.login, values.password).subscribe(res => {
          userId = res.id;
          const id: string = JSON.stringify(userId);
          sessionStorage.setItem('userId', id);
          this.router.navigateByUrl(this.authGuard.nextRoute || '/home');
        },
        error => {
          this.openDialog(this.dialogMessages.errorAuth, 'red');
        }
      );
    }
  }

  public onBlur(control: string): void {
    this.loginForm.controls[control].updateValueAndValidity();
    if (this.loginForm.get('password').value.length < minLengthPass) {
      this.errorMsg = 'Минимум 8 символов';
    }
  }

  public openDialog(message: string, colorMsg: string): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(DialogMessagesComponent, {
      height: '200px',
      width: '600px',
      data: {
        msg: message,
        color: colorMsg
      }
    });
    dialogRef.updatePosition({top: '80px', left: '35%'});
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

}
