import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../../../core/models/status';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Observable<Products[]> = this.apiService.getProducts();
  public status: Status = 'all';

  constructor(private apiService: ApiService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  public onSetStatus(status: Status): void {
    this.status = status;
  }

  public selectedProductForFavorite(e, idProduct: number): void {
    const product: Products = {
      id: idProduct,
      description: '', email: '', exchange: '', fullName: '', image: '', name: '', status: '',
      liked: true,
      inBasket: false
    };
    if (e.target.style.color === 'red') {
      e.target.style.color = 'gray';
    } else {
      e.target.style.color = 'red';
      this.apiService.updateLikedProduct(product, product.id).subscribe();
      this.apiService.getProducts();
      this.openDialog();
      // console.log(this.products);
    }

  }

  public openDialog(): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(HomeDialogComponent, {
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
