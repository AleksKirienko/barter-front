import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Status } from '../../../../core/models/status';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public newProductForm: FormGroup;
  public status: Status;
  public statuses: string[] = ['application', 'x-shader', 'video', 'image'];

  constructor() { }

  ngOnInit(): void {
    console.log('statuses: ', this.statuses);
  }

}
