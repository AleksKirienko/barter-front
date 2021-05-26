import { Component, Inject, OnInit } from '@angular/core';
import { DialogMessages } from '../../dialog-messages';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home-dialog',
  templateUrl: './dialog-messages.component.html',
  styleUrls: ['./dialog-messages.component.css']
})
export class DialogMessagesComponent implements OnInit {

  public boolLiked: boolean;
  public boolBasket: boolean;
  dialogMessages = DialogMessages;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.boolLiked = this.data.dataLiked;
    this.boolBasket = this.data.dataBasket;
    // console.log('dataBasket: ', this.data.dataBasket);
  }

}
