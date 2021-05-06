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
  * HomeComponent
  * Обновить продукт, если его захотели добавить в избранные товары
  */
  public updateLikedProduct(product: Products, id: number): Observable<Products> {
    const body = {
      licked: product.liked
    };
    return this.http.put<Products>(`${environment.apiUrl}/products/${id}`, body);
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
  * FavoritesComponent
  * Получение списка избранных товаров
  */
  public getFavoritesProducts(): Observable<Products[]> {
    return this.http.get<any>(`${environment.apiUrl}/products?licked=true`).pipe(
      map(data => data)
    );
  }

  /*
  * BasketComponent
  * Получение списка товаров в корзине
  */
  public getProductsInBasket(): Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.apiUrl}/products?inBasket=true`);
  }

  /*
  * AddProductComponent
  * Добавление нового товара
  */
  public postAddProduct(product: Products): Observable<Products> {
    const body = {
      name: product.name,
      image: product.image,
      status: product.status,
      description: product.description,
      exchange: product.exchange,
      fullName: product.fullName,
      email: product.email,
      licked: product.liked,
      inBasket: product.inBasket
    };
    return this.http.post<Products>(`${environment.apiUrl}/products`, body);
  }

}
