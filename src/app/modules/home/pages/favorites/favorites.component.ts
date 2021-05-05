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

  public selectedProduct(e, idProduct: number): void {
    e.target.style.color = 'gray';
    const product: Products = {
      id: idProduct,
      description: '', email: '', exchange: '', fullName: '', image: '', name: '', status: '',
      liked: false
    };
    this.apiService.updateLikedProduct(product, product.id).subscribe();
    this.products = this.apiService.getFavoritesProducts();
    // alert('Товар удален из избранных!');
  }
}
