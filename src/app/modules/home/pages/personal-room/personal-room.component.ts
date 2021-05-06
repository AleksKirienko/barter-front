import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { UserInformation } from '../../../../core/models/user-information';

@Component({
  selector: 'app-personal-room',
  templateUrl: './personal-room.component.html',
  styleUrls: ['./personal-room.component.css']
})
export class PersonalRoomComponent implements OnInit, OnDestroy {

  public userInfo: UserInformation;
  private subs: Subscription = new Subscription();

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.displayProducts();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private displayProducts(): void {
    this.subs.add(this.apiService.getUserInformation().subscribe(
      (user: UserInformation): void => {
        this.userInfo = user;
      }));
  }

}
