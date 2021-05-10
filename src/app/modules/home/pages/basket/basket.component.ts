import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  private subs: Subscription = new Subscription();
  public message = 'Корзина пуста!';

  constructor(
    private apiService: ApiService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.displayProducts();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private displayProducts(): void {
    this.subs.add(this.apiService.getProductsInBasket().subscribe(
      (products1: Products[]): void => {
        this.products = products1;
        console.log('length: ', this.products.length);
      }));
  }

  public getProductInformation(product): void {
    let link = 'home/product-information/';
    link = link.concat(product.replace(' ', '+'));
    this.router.navigate([]).then(result => {
      window.open(link, '_blank');
    });
  }

}
