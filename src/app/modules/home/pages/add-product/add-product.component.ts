import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../../core/models/status';
import { Router } from '@angular/router';
import { ErrorMessages } from '../../../auth/pages/registration/error-messages';
import { ApiService } from '../../../../core/services/api.service';
import { Products } from '../../../../core/models/products';
import { DialogMessagesComponent } from '../../../../shared/dialogs/dialog-messages/dialog-messages.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public newProductForm: FormGroup;
  public status: Status;
  public statuses: string[] = ['application', 'x-shader', 'video', 'image'];
  formErrors = ErrorMessages;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.newProductForm = this.formBuilder.group({
      nameProduct: ['', Validators.required],
      status: ['', Validators.required],
      descriptionProduct: ['', Validators.required],
      exchangeOffer: ['', Validators.required],
      exchanger: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imgUrl: ['', [Validators.required]],
    });

  }

  public onSubmit(): void {
    if (this.newProductForm.valid) {
      const product: Products = {
        id: 0,
        name: this.newProductForm.controls.nameProduct.value,
        image: this.newProductForm.controls.imgUrl.value,
        status: this.newProductForm.controls.status.value,
        description: this.newProductForm.controls.descriptionProduct.value,
        exchange: this.newProductForm.controls.exchangeOffer.value,
        exchange2: '',
        login: this.authService.receiveFromStorage(),
        fullName: this.newProductForm.controls.exchanger.value,
        email: this.newProductForm.controls.email.value,
        response: [],
        liked: false,
        inBasket: false
      };
      console.log(product);
      this.apiService.postAddProduct(product).subscribe();
      this.openDialog();
      this.router.navigateByUrl('/home');
    }
  }

  public openDialog(): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(DialogMessagesComponent, {
      height: '200px',
      width: '600px',
      data: {
        newProduct: true
      }
    });
    dialogRef.updatePosition({top: '80px', left: '35%'});
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

}
