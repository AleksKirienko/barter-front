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
import { DialogMessages } from '../../../../shared/dialog-messages';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public newProductForm: FormGroup;
  public status: Status;
  public statuses: string[] = ['одежда', 'аксессуары', 'канцелярия', 'техника', 'еда', 'посуда', 'для отдыха', 'игрушки', 'прочее'];
  formErrors = ErrorMessages;
  dialogMessages = DialogMessages;

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
      imgUrl: ['', [Validators.required]],
    });

  }

  public onSubmit(): void {
    if (this.newProductForm.valid) {
      const product: Products = {
        id: 0, ownerId: 0,
        name: this.newProductForm.controls.nameProduct.value,
        category: this.newProductForm.controls.status.value,
        description: this.newProductForm.controls.descriptionProduct.value,
        image: this.newProductForm.controls.imgUrl.value,
        exchange: '', exchange2: '', login: '', fullName: '', email: '',
        response: []
      };
      console.log(product);
      const userId: number = this.authService.receiveIdFromStorage();
      console.log('id: ', userId);
      this.apiService.postAddProduct(product, userId).subscribe(() => {
        this.openDialog(this.dialogMessages.addNewProduct, 'green');
        this.router.navigateByUrl('/home');
      });
    }
  }

  public openDialog(message: string, colorMsg: string): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(DialogMessagesComponent, {
      height: '200px',
      width: '600px',
      data: {
        msg: message,
        color: colorMsg
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
