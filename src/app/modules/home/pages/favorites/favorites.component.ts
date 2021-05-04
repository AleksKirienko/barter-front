import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public products: Observable<Products[]> = this.apiService.getFavoritesProducts();

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  public selectedProduct(e): void {
    e.target.style.color = 'gray';
  }
}
