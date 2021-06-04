import { Component, OnDestroy, OnInit } from '@angular/core';
import { Products } from '../../../../core/models/products';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit, OnDestroy {

  public product: Products = {
    id: 0,
    name: '',
    description: '',
    image: '',
    category: '',
    exchange: '',
    exchange2: '',
    fullName: '',
    email: '',
    login: '',
    response: []
  };
  private subs: Subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.displayProducts();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public displayProducts(): void {
    this.subs.add(this.route.params.pipe(
      mergeMap((params: Params): Observable<Products> => {
        const productId: number = params.product;
        console.log('author = ', productId);
        return this.apiService.getProductById(productId);
      })
    ).subscribe((product: Products): void => {
      console.log(product);
      this.product = product;
    }));
  }
}
