import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { User } from '../../../../core/models/user';
import { AuthService } from '../../../../core/services/auth.service';
import { Products } from '../../../../core/models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-room',
  templateUrl: './personal-room.component.html',
  styleUrls: ['./personal-room.component.css']
})
export class PersonalRoomComponent implements OnInit, OnDestroy {

  public user: User = {
    id: 0, name: '', email: '', login: '', password: '', favorites: [], token: ''
  };
  public products: Products[] = [];
  public message = 'Вы не добавляли свой товар';
  private subs: Subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.displayProducts();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private displayProducts(): void {
    const userLogin = this.authService.receiveLoginFromStorage();
    this.subs.add(this.apiService.getUser(userLogin).subscribe(
      (user1: User): void => {
        this.user = user1[0];
      }));
    this.subs.add(this.apiService.getUserProducts(userLogin).subscribe(
      (products1: Products[]): void => {
        this.products = products1;
        console.log(products1);
      }));
  }

  public deleteMyProduct(e, idProduct: number): void {
    this.apiService.deleteMyProduct(idProduct).subscribe(() => {
      this.displayProducts();
    });
  }

  public getProductInformation(product): void {
    let link = 'home/product-information/';
    link = link.concat(product.replace(' ', '+'));
    this.router.navigate([]).then(result => {
      window.open(link, '_blank');
    });
  }

}
