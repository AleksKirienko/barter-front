import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  private subs: Subscription = new Subscription();
  public message = 'Корзина пуста!';

  constructor(private apiService: ApiService) {
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

}
