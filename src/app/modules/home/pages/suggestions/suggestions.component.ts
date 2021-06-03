import { Component, OnInit, OnDestroy } from '@angular/core';
import { Products } from '../../../../core/models/products';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  private subs: Subscription = new Subscription();
  public message = 'Пока откликов на ваши товары не поступало';
  public message2 = 'Вы можете добавить свои товары в раздере "Добавить товар"';

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.displayProducts();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public displayProducts(): void {
    const userLogin = this.authService.receiveLoginFromStorage();
    // this.subs.add(this.apiService.getUserProducts(userLogin).subscribe(
    //   (products1: Products[]): void => {
    //     this.products = products1;
    //     console.log(products1);
    //   }));
  }

}
