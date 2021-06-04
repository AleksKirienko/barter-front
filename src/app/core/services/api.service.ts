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
   * @param user - обект с полученными данными из формы
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
   * Получение списка всех товаров
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
   * @param productId - id товара
   */
  public getProductById(productId: number): Observable<Products> {
    return this.http.post<Products>(`${environment.apiUrl}/product/product_info?productId=${productId}`, null);
  }

  /**
   * Добавление товара в избранные
   * @param userId - id вошедшего пользователя
   * @param productId - id товара
   */
  public updateLikedProduct(userId: number, productId: number): Observable<User> {
    console.log(userId, ' ', productId);
    return this.http.post<User>(`${environment.apiUrl}/user/add_faves?productId=${productId}&userId=${userId}`, null);
  }

  /**
   * Удаление товара из избранных
   * @param userId - id вошедшего пользователя
   * @param productId - id выбранного товара
   */
  public deleteLikedProduct(userId: number, productId: number): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user/delete_faves?productId=${productId}&userId=${userId}`, null);
  }

  /**
   * Проверка добавлен ли товар в избранные
   * @param userId - id вошедшего пользователя
   * @param productId - id выбранного товара
   */
  public checkProductInFaves(userId: number, productId: number): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/product/return_faves?productId=${productId}&userId=${userId}`, null);
  }

  // /**
  //  * HomeComponent
  //  * Обновить продукт при добавлении в корзину
  //  */
  // public updateBasketProduct(product: Products, id: number): Observable<Products> {
  //   const body = {
  //     inBasket: product.inBasket,
  //     exchange2: product.exchange2
  //   };
  //   return this.http.post<Products>(`${environment.apiUrl}/products/${id}`, body);
  // }

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
    return this.http.post<Products>(`${environment.apiUrl}/product/delete_product?productId=${productId}`, null);
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
