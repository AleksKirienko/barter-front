import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FavoritesDialogComponent } from './favorites-dialog/favorites-dialog.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  private subs: Subscription = new Subscription();
  public message = 'Нет избранных товаров!';

  constructor(private apiService: ApiService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.displayProducts();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private displayProducts(): void {
    this.subs.add(this.apiService.getFavoritesProducts().subscribe(
      (products1: Products[]): void => {
        this.products = products1;
        console.log('length: ', this.products.length);
      }));
  }

  public selectedProduct(e, idProduct: number): void {
    e.target.style.color = 'gray';
    const product: Products = {
      id: idProduct,
      description: '', email: '', exchange: '', fullName: '', image: '', name: '', status: '',
      liked: false,
      inBasket: false
    };
    this.apiService.updateLikedProduct(product, product.id).subscribe();
    this.displayProducts();
    // this.products = this.apiService.getFavoritesProducts();
    this.openDialog();
  }

  public openDialog(): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(FavoritesDialogComponent, {
      height: '200px',
      width: '600px',
      data: {}
    });
    dialogRef.updatePosition({top: '80px', left: '35%'});
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

}
