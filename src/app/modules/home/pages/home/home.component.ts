import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { Status } from '../../../../core/models/status';
import { HomeDialogComponent } from '../../../../shared/home-dialog/home-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  private subs: Subscription = new Subscription();
  public status: Status = 'all';
  public boolLiked = false;

  constructor(private apiService: ApiService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.displayProducts();
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

  public onSetStatus(status: Status): void {
    this.status = status;
  }

  public selectedProductForFavorite(e, idProduct: number): void {
    if (e.target.style.color === 'red') {
      this.boolLiked = false;
      e.target.style.color = 'gray';
    } else {
      this.boolLiked = true;
      e.target.style.color = 'red';
    }
    const product: Products = {
      id: idProduct,
      description: '', email: '', exchange: '', fullName: '', image: '', name: '', status: '',
      liked: this.boolLiked,
      inBasket: false
    };
    console.log('product: ', product);
    this.apiService.updateLikedProduct(product, product.id).subscribe();
    this.apiService.getProducts();
    this.openDialog();
  }

  public openDialog(): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(HomeDialogComponent, {
      height: '200px',
      width: '600px',
      data: {
        dataKey: this.boolLiked
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
