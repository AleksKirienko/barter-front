import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import { environment } from '../../../environments/environment';
import { UserInformation } from '../models/user-information';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  /**
   * HomeComponent
   * Получение списка товаров
   */
  public getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.apiUrl}/products`);
  }

  /**
   * HomeComponent
   * Поиск товара по названию
   */
  public getSearchProducts(nameProduct: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.apiUrl}/products?name=${nameProduct}`);
  }

  /**
   * Получение всей информации о товаре
   */
  public getProductById(id: number): Observable<Products> {
    return this.http.get<Products>(`${environment.apiUrl}/products/${id}`);
  }

  /**
   * HomeComponent
   * Обновить продукт, если его захотели добавить в избранные товары
   */
  public updateLikedProduct(product: Products, id: number): Observable<Products> {
    const body = {
      liked: product.liked
    };
    return this.http.put<Products>(`${environment.apiUrl}/products/${id}`, body);
  }

  /**
   * HomeComponent
   * Обновить продукт при добавлении в корзину
   */
  public updateBasketProduct(product: Products, id: number): Observable<Products> {
    const body = {
      inBasket: product.inBasket,
      exchange2: product.exchange2
    };
    return this.http.put<Products>(`${environment.apiUrl}/products/${id}`, body);
  }

  /**
   * PersonalRoomComponent
   * Получение информации о пользователе в личном кабинете
   */
  public getUserInformation(): Observable<UserInformation> {
    return this.http.get<UserInformation>(`${environment.apiUrl}/person-information`);
  }

  /**
   * FavoritesComponent
   * Получение списка избранных товаров
   */
  public getFavoritesProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.apiUrl}/products?liked=true`);
  }

  /**
   * BasketComponent
   * Получение списка товаров в корзине
   */
  public getProductsInBasket(): Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.apiUrl}/products?inBasket=true`);
  }

  /**
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
      liked: product.liked,
      inBasket: product.inBasket
    };
    return this.http.post<Products>(`${environment.apiUrl}/products`, body);
  }

}
