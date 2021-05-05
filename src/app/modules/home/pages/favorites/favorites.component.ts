import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FavoritesDialogComponent } from './favorites-dialog/favorites-dialog.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public products: Observable<Products[]> = this.apiService.getFavoritesProducts();

  constructor(private apiService: ApiService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public selectedProduct(e, idProduct: number): void {
    e.target.style.color = 'gray';
    const product: Products = {
      id: idProduct,
      description: '', email: '', exchange: '', fullName: '', image: '', name: '', status: '',
      liked: false
    };
    this.apiService.updateLikedProduct(product, product.id).subscribe();
    this.products = this.apiService.getFavoritesProducts();
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
