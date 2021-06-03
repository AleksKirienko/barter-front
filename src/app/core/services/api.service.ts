import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  /**
   * Регистрация
   */
  public signUp(user: User): Observable<User> {
    const body = {
      name: user.name,
      email: user.email,
      password: user.password
    };
    return this.http.post<User>(`${environment.apiUrl}/user/reg`, body);
  }

  /**
   * HomeComponent
   * Получение списка товаров
   */
  public getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.apiUrl}/product/all`);
  }

  /**
   * Получение списка товаров добавленных пользователем
   * @param userId - id из sessionStorage
   */
  public getUserProducts(userId: number): Observable<Products[]> {
    return this.http.post<Products[]>(`${environment.apiUrl}/product/myproducts?userId=${userId}`, null);
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
  public updateLikedProduct(userId: number, productId: number): Observable<User> {
    console.log(userId, ' ', productId);
    return this.http.post<User>(`${environment.apiUrl}/user/add_faves?productId=${productId}&userId=${userId}`, null);
  }

  public deleteLikedProduct(userId: number, productId: number): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user/delete_faves?productId=${productId}&userId=${userId}`, null);
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
   * Получение информации о пользователе в личном кабинете по id
   * @param userId - id пользователя
   */
  public getUser(userId: number): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user/info?userId=${userId}`, null);
  }

  /**
   * Удаление добавленного товара из личного кабинета
   * @param productId - id удаляемого продукта
   */
  public deleteMyProduct(productId: number): Observable<Products> {
    return this.http.delete<Products>(`${environment.apiUrl}/products/${productId}`);
  }

  /**
   * FavoritesComponent
   * Получение списка избранных товаров
   */
  public getFavoritesProducts(userId: number): Observable<Products[]> {
    return this.http.post<Products[]>(`${environment.apiUrl}/product/faves?userId=${userId}`, null);
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
  public postAddProduct(product: Products, userID: number): Observable<Products> {
    const body = {
      name: product.name,
      category: product.category,
      description: product.description,
      image: product.image
    };
    return this.http.post<Products>(`${environment.apiUrl}/product/add?userID=${userID}`, body);
  }

}
