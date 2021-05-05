import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../../../core/models/status';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Observable<Products[]> = this.apiService.getProducts();
  public status: Status = 'all';

  constructor(private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  public onSetStatus(status: Status): void {
    this.status = status;
  }

  public selectedProduct(e, idProduct: number): void {
    const product: Products = {
      id: idProduct,
      description: '', email: '', exchange: '', fullName: '', image: '', name: '', status: '',
      liked: true
    };
    if (e.target.style.color === 'red') {
      e.target.style.color = 'gray';
    } else {
      e.target.style.color = 'red';
      this.apiService.updateLikedProduct(product, product.id).subscribe();
      this.apiService.getProducts();
      // console.log(this.products);
      // alert('Товар добавлен в избранные');
    }

  }
}
