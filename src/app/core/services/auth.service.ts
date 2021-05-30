import { Injectable } from '@angular/core';
import { Authorization } from '../models/authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public signIn(userLogin: string): void {
    const obj: Authorization = {
      login: userLogin
    };
    const rez: string = JSON.stringify(obj);
    sessionStorage.setItem('login', rez);
  }

  public receiveFromStorage(): string {
    const res: string = sessionStorage.getItem('login');
    const authObj: Authorization = JSON.parse(res);
    return authObj ? authObj.login : '';
  }

}
