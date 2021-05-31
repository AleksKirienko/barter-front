import { Injectable } from '@angular/core';
import { Authorization } from '../models/authorization';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public signIn(userLogin: string, userPass: string): void {
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
