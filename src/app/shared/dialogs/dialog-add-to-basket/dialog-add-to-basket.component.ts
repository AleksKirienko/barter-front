import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../../modules/auth/pages/registration/error-messages';
import { Products } from '../../../core/models/products';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-add-to-basket',
  templateUrl: './dialog-add-to-basket.component.html',
  styleUrls: ['./dialog-add-to-basket.component.css']
})
export class DialogAddToBasketComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  public addToBasketForm: FormGroup;
  public boolBasket = false;
  public clickHeat = false;
  public idProduct: number;
  public product: Products;
  private subs: Subscription = new Subscription();
  formErrors = ErrorMessages;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddToBasketComponent>,
    private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {
    dialogRef.disableClose = true;
    this.getMyProducts();
  }

  ngOnInit(): void {
    this.addToBasketForm = this.formBuilder.group({
      exchangeOffer: ['', Validators.required]
    });
    this.idProduct = this.data.id;
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public closeDialogWindow(): void {
    this.dialogRef.close();
  }

  public getMyProducts(): void {
    const userLogin = this.authService.receiveLoginFromStorage();
    this.subs.add(this.apiService.getUserProducts(userLogin).subscribe(
      (products1: Products[]): void => {
        this.products = products1;
        console.log(products1);
      }));
  }

  public onSubmit(): void {
    this.boolBasket = true;
    this.product = {
      id: this.idProduct,
      description: '', email: '', exchange: '', fullName: '', image: '', name: '', category: '', login: '',
      response: [],
      exchange2: this.addToBasketForm.controls.exchangeOffer.value,
      liked: false,
      inBasket: this.boolBasket
    };
    this.apiService.updateBasketProduct(this.product, this.product.id).subscribe(() => {
      this.dialogRef.close();
    });

  }

}
