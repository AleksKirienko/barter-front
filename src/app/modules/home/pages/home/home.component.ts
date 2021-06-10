import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { Status } from '../../../../core/models/status';
import { DialogMessagesComponent } from '../../../../shared/dialogs/dialog-messages/dialog-messages.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddToTradeComponent } from '../../../../shared/dialogs/dialog-add-to-trade/dialog-add-to-trade.component';
import { AuthService } from '../../../../core/services/auth.service';
import { DialogMessages } from '../../../../shared/dialog-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  public favesProducts: Products[] = [];
  private subs: Subscription = new Subscription();
  public message = 'Товары не найдены!';
  public status: Status = 'all';
  public boolLiked = false;
  public favoriteLength = 0;
  public userId: number;
  dialogMessages = DialogMessages;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userId = this.authService.receiveIdFromStorage();
    this.favoritesProductsList();
    this.displayProducts();
    this.getFavoriteProductsLength();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public favoritesProductsList(): void {
    const userId: number = this.authService.receiveIdFromStorage();
    this.subs.add(this.apiService.getFavoritesProducts(userId).subscribe(
      (productsList: Products[]): void => {
        this.favesProducts = productsList;
      }));
  }

  private displayProducts(): void {
    this.subs.add(this.apiService.getProducts().subscribe(
      (products1: Products[]): void => {
        this.products = products1;
      }));
  }

  public getFavoriteProductsLength(): void {
    this.apiService.getFavoritesProducts(this.userId).subscribe(
      (products1: Products[]): void => {
        this.favoriteLength = products1.length;
      });
  }


  public onSetStatus(status: Status): void {
    this.status = status;
  }

  public searchProducts(product: string): void {
    console.log(product);
    if (product === '') {
      this.displayProducts();
    }
    this.subs.add(this.apiService.getSearchProducts(product).subscribe(
      (products1: Products[]): void => {
        this.products = products1;
      }
    ));
  }

  public isFavorite(idProduct: number): boolean {
    return !!this.favesProducts.find(product => product.id === idProduct);
  }

  public selectedProductForFavorite(e, product): void {
    if (this.userId !== product.ownerId) {
      if (e.target.style.color === 'red') {
        e.target.style.color = 'gray';
      } else {
        e.target.style.color = 'red';
      }
      this.apiService.checkProductInFaves(this.userId, product.id).subscribe(res => {
        this.boolLiked = res;
        console.log(this.boolLiked);

        if (!this.boolLiked) {
          this.apiService.updateLikedProduct(this.userId, product.id).subscribe(() => {
            this.apiService.getProducts();
            this.getFavoriteProductsLength();
            this.openDialog(this.dialogMessages.likedProduct, 'green');
          });
        } else {
          this.apiService.deleteLikedProduct(this.userId, product.id).subscribe(() => {
            this.apiService.getProducts();
            this.getFavoriteProductsLength();
            this.openDialog(this.dialogMessages.delLikedProduct, 'red');
          });
        }

      });
    } else {
      this.openDialog(this.dialogMessages.likedMyProduct, 'red');
    }
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
  }

  public getProductInformation(productId: number): void {
    let link = 'home/product-information/';
    link = link.concat(productId.toString());
    this.router.navigate([]).then(() => {
      window.open(link, '_blank');
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
