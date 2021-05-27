import { Component, Inject, OnInit } from '@angular/core';
import { DialogMessages } from '../../dialog-messages';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home-dialog',
  templateUrl: './dialog-messages.component.html',
  styleUrls: ['./dialog-messages.component.css']
})
export class DialogMessagesComponent implements OnInit {

  public boolLiked = false;
  public boolBasket = false;
  public newProduct = false;
  public heart = false;
  dialogMessages = DialogMessages;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.boolLiked = this.data.dataLiked;
    this.boolBasket = this.data.dataBasket;
    this.newProduct = this.data.newProduct;
    this.heart = this.data.heart;
  }

}
