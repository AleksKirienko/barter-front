import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { Status } from '../../../../core/models/status';
import { DialogMessagesComponent } from '../../../../shared/dialogs/dialog-messages/dialog-messages.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddToBasketComponent } from '../../../../shared/dialogs/dialog-add-to-basket/dialog-add-to-basket.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  private subs: Subscription = new Subscription();
  public message = 'Товары не найдены!';
  public status: Status = 'all';
  public boolLiked = false;
  public boolBasket = false;
  public clickHeat = false;
  public favoriteLength = 0;
  public basketLength = 0;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.displayProducts();
    this.getFavoriteProductsLength();
    this.getBasketProductsLength();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private displayProducts(): void {
    this.subs.add(this.apiService.getProducts().subscribe(
      (products1: Products[]): void => {
        this.products = products1;
        console.log(this.products);
      }));
  }

  public getFavoriteProductsLength(): void {
    this.apiService.getFavoritesProducts().subscribe(
      (products1: Products[]): void => {
        this.favoriteLength = products1.length;
      });
  }

  public getBasketProductsLength(): void {
    this.apiService.getProductsInBasket().subscribe(
      (products1: Products[]): void => {
        this.basketLength = products1.length;
      });
  }

  public onSetStatus(status: Status): void {
    this.status = status;
  }

  public searchProducts(product: string): void {
    console.log(product);
    this.subs.add(this.apiService.getSearchProducts(product).subscribe(
      (products1: Products[]): void => {
        this.products = products1;
        console.log('joj', this.products);
      }
    ));
  }

  public selectedProductForFavorite(e, idProduct: number): void {
    this.clickHeat = true;
    if (e.target.style.color === 'red') {
      this.boolLiked = false;
      e.target.style.color = 'gray';
    } else {
      this.boolLiked = true;
      e.target.style.color = 'red';
    }
    const product: Products = {
      id: idProduct,
      description: '', email: '', exchange: '', exchange2: '', fullName: '', image: '', name: '', status: '', login: '',
      response: [],
      liked: this.boolLiked,
      inBasket: false
    };
    console.log('product: ', product);
    this.apiService.updateLikedProduct(product, product.id).subscribe(
      () => {
        this.apiService.getProducts();
        this.getFavoriteProductsLength();
        this.openDialog();
        this.clickHeat = false;
      });
  }

  public selectedProductForBasket(e, idProduct: number): void {
    this.clickHeat = false;
    const dialogRef = this.dialog.open(DialogAddToBasketComponent, {
      height: '400px',
      width: '700px',
      data: {
        id: idProduct
      }
    });
    dialogRef.updatePosition({top: '10%'});
    dialogRef.afterClosed().subscribe(res => {
      this.boolBasket = true;
      if (res) {
        this.getBasketProductsLength();
        this.openDialog();
      }
    });
  }

  public getProductInformation(product): void {
    let link = 'home/product-information/';
    link = link.concat(product.replace(' ', '+'));
    // this.router.navigate(['home/product-information', product.replace(' ', '+')]);
    this.router.navigate([]).then(() => {
      window.open(link, '_blank');
    });
  }

  public openDialog(): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(DialogMessagesComponent, {
      height: '200px',
      width: '600px',
      data: {
        dataLiked: this.boolLiked,
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
