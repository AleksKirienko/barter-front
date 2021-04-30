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
export class HomeComponent implements OnInit, OnDestroy {

  public products: Observable<Products[]> = this.apiService.loadProducts();
  public status: Status = 'all';
  public mobileQuery: MediaQueryList;
  // tslint:disable-next-line:variable-name
  private _mobileQueryListener: () => void;

  constructor(private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public onSetStatus(status: Status): void {
    this.status = status;
  }

}
