import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../../../core/models/products';
import { ApiService } from '../../../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../../../core/models/status';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Observable<Products[]> = this.apiService.loadProducts();
  public status: Status = 'all';
  public activeStatus: string;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  public onSetStatus(status: Status): void {
    this.status = status;
  }

}
