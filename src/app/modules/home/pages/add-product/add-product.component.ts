import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../../core/models/status';
import { Router } from '@angular/router';
import { ErrorMessages } from '../../../auth/pages/registration/error-messages';
import { ApiService } from '../../../../core/services/api.service';
import { Products } from '../../../../core/models/products';

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
    private apiService: ApiService,
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
        fullName: this.newProductForm.controls.exchanger.value,
        email: this.newProductForm.controls.email.value,
        liked: false
      };
      console.log(product);
      this.apiService.postAddProduct(product).subscribe();
      alert('Add new product success!');
    }
  }

}
