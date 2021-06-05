import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Products } from '../../../core/models/products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorMessages } from '../../../modules/auth/pages/registration/error-messages';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dialog-add-trade-personal-room',
  templateUrl: './dialog-add-trade-personal-room.component.html',
  styleUrls: ['./dialog-add-trade-personal-room.component.css']
})
export class DialogAddTradePersonalRoomComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  public favesProducts: Products[] = [];
  public selectedProducts: Products[] = [];
  public addToTradeForm: FormGroup;
  public boolBasket = false;
  public clickHeat = false;
  public idProduct: number;
  public product: Products;
  private subs: Subscription = new Subscription();
  formErrors = ErrorMessages;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddTradePersonalRoomComponent>,
    private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {
    dialogRef.disableClose = true;
    this.getFavoritesProducts();
  }

  ngOnInit(): void {
    this.addToTradeForm = this.formBuilder.group({
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

  public getFavoritesProducts(): void {
    const userId: number = this.authService.receiveIdFromStorage();
    this.subs.add(this.apiService.getFavoritesProducts(userId).subscribe(
      (productsList: Products[]): void => {
        this.favesProducts = productsList;
        console.log(this.favesProducts);
      }));
  }

  public onSubmit(): void {
    this.boolBasket = true;
    let selectProductsId;
    this.selectedProducts = this.addToTradeForm.controls.exchangeOffer.value;
    selectProductsId = this.selectedProducts.map(res => {
      return res.id;
    });
    console.log(selectProductsId);
    this.apiService.addProductsForTradeFromPersonalRoom(this.idProduct, selectProductsId).subscribe(() => {
      this.dialogRef.close();
    });

  }

}
