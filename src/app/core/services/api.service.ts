import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { UserInformation } from '../models/user-information';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  /*
  * HomeComponent
  * Получение списка товаров
  */
  public getProducts(): Observable<Products[]> {
    return this.http.get<any>(`${environment.apiUrl}/products`).pipe(
      map(data => data)
    );
  }

  /*
  * PersonalRoomComponent
  * Получение информации о пользователе в личном кабинете
  */
  public getUserInformation(): Observable<UserInformation[]> {
    return this.http.get<any>(`${environment.apiUrl}/person-information`).pipe(
      map(data => data)
    );
  }

  /*
  * BasketComponent
  * Получение списка товаров в корзине
  */
  public getProductsInBasket(): Observable<Products[]> {
    return this.http.get<any>(`${environment.apiUrl}/basket`).pipe(
      map(data => data)
    );
  }

}
