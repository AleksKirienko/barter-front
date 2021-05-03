import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public products: Observable<Products[]> = this.apiService.getProductsInBasket();

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

}
