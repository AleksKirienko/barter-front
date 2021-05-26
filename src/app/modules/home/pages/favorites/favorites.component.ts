import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessagesComponent } from '../../../../shared/dialogs/dialog-messages/dialog-messages.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  private subs: Subscription = new Subscription();
  public message = 'Нет избранных товаров!';
  public boolBasket = false;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.displayProducts();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private displayProducts(): void {
    this.subs.add(this.apiService.getFavoritesProducts().subscribe(
      (products1: Products[]): void => {
        this.products = products1;
        console.log(products1);
        console.log('length: ', this.products.length);
      }));
  }

  public getProductInformation(product): void {
    let link = 'home/product-information/';
    link = link.concat(product.replace(' ', '+'));
    this.router.navigate([]).then(() => {
      window.open(link, '_blank');
    });
  }

  public selectedProduct(e, idProduct: number): void {
    if (e.target.style.color === 'red') {
      e.target.style.color = 'gray';
    }
    const product: Products = {
      id: idProduct,
      description: '', email: '', exchange: '', exchange2: '', fullName: '', image: '', name: '', status: '',
      liked: false,
      inBasket: false
    };
    this.apiService.updateLikedProduct(product, product.id).subscribe(() => {
      this.displayProducts();
    });
    this.openDialog();
  }

  public selectedProductForBasket(e, idProduct: number): void {
    console.log(e.target.style.color);
    this.boolBasket = true;
    const product: Products = {
      id: idProduct,
      description: '', email: '', exchange: '', exchange2: '', fullName: '', image: '', name: '', status: '',
      liked: false,
      inBasket: this.boolBasket
    };
    this.apiService.updateBasketProduct(product, product.id).subscribe(() => {
      this.selectedProduct(e, product.id);
      this.boolBasket = false;
    });
  }

  public openDialog(): void {
    const timeout = 2000;

    const dialogRef = this.dialog.open(DialogMessagesComponent, {
      height: '200px',
      width: '600px',
      data: {
        dataLiked: false,
        dataBasket: this.boolBasket
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
