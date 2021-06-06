import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { Router } from '@angular/router';
import { DialogMessagesComponent } from '../../../../shared/dialogs/dialog-messages/dialog-messages.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  private subs: Subscription = new Subscription();
  public boolBasket: boolean;
  public clickHeat = false;
  public message = 'Корзина пуста!';

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    // this.displayProducts();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // private displayProducts(): void {
  //   this.subs.add(this.apiService.getProductsInBasket().subscribe(
  //     (products1: Products[]): void => {
  //       this.products = products1;
  //       console.log('length: ', this.products.length);
  //     }));
  // }

  public getProductInformation(product): void {
    let link = 'home/product-information/';
    link = link.concat(product.replace(' ', '+'));
    this.router.navigate([]).then(result => {
      window.open(link, '_blank');
    });
  }

  public deleteProductFromBasket(e, idProduct: number): void {
    const product: Products = {
      id: idProduct, ownerId: 0,
      description: '', email: '', exchange: '', exchange2: '', fullName: '', image: '', name: '', category: '', login: '',
      response: []
    };
    // this.apiService.updateBasketProduct(product, product.id).subscribe(() => {
    //   this.displayProducts();
    // });
    this.boolBasket = false;
    this.openDialog();
  }

  public openDialog(): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(DialogMessagesComponent, {
      height: '200px',
      width: '600px',
      data: {
        dataLiked: false,
        dataBasket: false,
        heart: this.clickHeat
      }
    });
    dialogRef.updatePosition({top: '80px', left: '35%'});
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

}
