import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { UserInformation } from '../../../../core/models/user-information';

@Component({
  selector: 'app-personal-room',
  templateUrl: './personal-room.component.html',
  styleUrls: ['./personal-room.component.css']
})
export class PersonalRoomComponent implements OnInit {

  public userInfo: Observable<UserInformation[]> = this.apiService.getUserInformation();

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

}
