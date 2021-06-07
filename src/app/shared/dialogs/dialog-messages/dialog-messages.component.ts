import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home-dialog',
  templateUrl: './dialog-messages.component.html',
  styleUrls: ['./dialog-messages.component.css']
})
export class DialogMessagesComponent implements OnInit {

  public message = '';
  public colorMsg = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.message = this.data.msg;
    this.colorMsg = this.data.color;
  }

}
