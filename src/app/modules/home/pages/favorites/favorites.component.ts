import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessagesComponent } from '../../../../shared/dialogs/dialog-messages/dialog-messages.component';
import { Router } from '@angular/router';
import { DialogAddToTradeComponent } from '../../../../shared/dialogs/dialog-add-to-trade/dialog-add-to-trade.component';
import { AuthService } from '../../../../core/services/auth.service';
import { DialogMessages } from '../../../../shared/dialog-messages';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  private subs: Subscription = new Subscription();
  public message = 'Нет избранных товаров!';
  dialogMessages = DialogMessages;
  public userId: number;

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

  public isFavorite(idProduct: number): boolean {
    return !!this.products.find(product => product.id === idProduct);
  }

  public selectedProduct(e, idProduct: number, mes2: string, color: string): void {
    let message = this.dialogMessages.delLikedProduct;
    let colorMsg = 'red';
    if (e.target.style.color === 'red') {
      e.target.style.color = 'gray';
    }
    console.log('mes2: ', mes2, ' ', color);
    if (mes2 && color) {
      message = mes2;
      colorMsg = color;
    }
    this.apiService.deleteLikedProduct(this.userId, idProduct).subscribe(() => {
      this.openDialog(message, colorMsg);
      this.displayProducts();
    });
  }

  public selectedProductForTrade(e, idProduct: number): void {
    const dialogRef = this.dialog.open(DialogAddToTradeComponent, {
      height: '400px',
      width: '700px',
      data: {
        id: idProduct
      }
    });
    dialogRef.updatePosition({top: '10%'});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.openDialog(this.dialogMessages.successAddForTrade, 'green');
        this.selectedProduct(e, idProduct, this.dialogMessages.successAddForTrade, 'green');
      }
    });
  }

  public openDialog(message: string, colorMsg: string): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(DialogMessagesComponent, {
      height: '200px',
      width: '600px',
      data: {
        msg: message,
        color: colorMsg
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
