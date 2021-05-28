import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../../modules/auth/pages/registration/error-messages';

@Component({
  selector: 'app-dialog-add-to-basket',
  templateUrl: './dialog-add-to-basket.component.html',
  styleUrls: ['./dialog-add-to-basket.component.css']
})
export class DialogAddToBasketComponent implements OnInit {

  public addToBasketForm: FormGroup;
  formErrors = ErrorMessages;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddToBasketComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.addToBasketForm = this.formBuilder.group({
      exchangeOffer: ['', Validators.required]
    });
  }

  public closeDialogWindow(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    console.log('kek');
  }

}
