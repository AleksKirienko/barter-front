import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Trade } from '../../../../core/models/trade';

@Component({
  selector: 'app-suggestions',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit, OnDestroy {

  public trades: Trade[] = [];
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
    const userId: number = this.authService.receiveIdFromStorage();
    this.subs.add(this.apiService.getOffers(userId).subscribe((res: Trade[]): void => {
      this.trades = res;
      console.log(this.trades);
      // for (const trade of this.trades) {
      //   this.products[this.products.length] = {myProducts: trade.sendProduct, receiveProducts: trade.receiveProduct};
      // }
    }));


  }

}
