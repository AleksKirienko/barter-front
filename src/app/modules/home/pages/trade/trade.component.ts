import { Component, OnInit, OnDestroy } from '@angular/core';
import { Products } from '../../../../core/models/products';
import { interval, Subscription } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { AuthService } from '../../../../core/services/auth.service';
import { startWith, switchMap } from 'rxjs/operators';
import { Trade } from '../../../../core/models/trade';

@Component({
  selector: 'app-suggestions',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  public trades: Trade[] = [];
  private subs: Subscription = new Subscription();
  public timeInterval: Subscription;
  public message = 'Пока откликов на ваши товары не поступало';
  public message2 = 'Вы можете добавить свои товары в раздере "Добавить товар"';

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const hour = new Date().getHours();
    if (hour === 18) {
      this.timeInterval = interval(hour * 1000 * 60).pipe(
        startWith(0),
        switchMap(() => this.apiService.getOffers())
      ).subscribe(res  => {
          // this.trades = res;
          console.log('res: ', res);
        },
        error => {
          console.log('error: ', error);
        });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.timeInterval.unsubscribe();
  }

  public displayProducts(): void {
    const userId: number = this.authService.receiveIdFromStorage();
    this.subs.add(this.apiService.getUserProducts(userId).subscribe(
      (products1: Products[]): void => {
        this.products = products1;
        console.log(this.products);
      }));
  }

}
