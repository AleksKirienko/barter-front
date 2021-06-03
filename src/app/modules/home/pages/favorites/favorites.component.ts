import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessagesComponent } from '../../../../shared/dialogs/dialog-messages/dialog-messages.component';
import { Router } from '@angular/router';
import { DialogAddToBasketComponent } from '../../../../shared/dialogs/dialog-add-to-basket/dialog-add-to-basket.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  private subs: Subscription = new Subscription();
  public message = 'Нет избранных товаров!';
  public userId: number;
  public boolBasket = false;
  public clickHeat = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userId = this.authService.receiveIdFromStorage();
    this.displayProducts();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private displayProducts(): void {
    const userId: number = this.authService.receiveIdFromStorage();
    this.subs.add(this.apiService.getFavoritesProducts(userId).subscribe(
      (products1: Products[]): void => {
        this.products = products1;
        console.log(products1);
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
    this.clickHeat = true;
    if (e.target.style.color === 'red') {
      e.target.style.color = 'gray';
    }
    this.apiService.deleteLikedProduct(this.userId, idProduct).subscribe(() => {
      this.displayProducts();
      this.openDialog();
      this.clickHeat = false;
    });
  }

  public selectedProductForBasket(e, idProduct: number): void {
    const dialogRef = this.dialog.open(DialogAddToBasketComponent, {
      height: '400px',
      width: '700px',
      data: {
        id: idProduct
      }
    });
    dialogRef.updatePosition({top: '10%'});
    dialogRef.afterClosed().subscribe(res => {
      this.boolBasket = res;
      if (res) {
        this.selectedProduct(e, idProduct);
      }
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
        dataBasket: this.boolBasket,
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
