import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PaymentType } from '../models/payment-type';
import { EditService } from '../services/edit.service';

@Component({
  selector: 'app-edit-standing-order',
  templateUrl: './edit-standing-order.component.html',
  styleUrls: ['./edit-standing-order.component.scss'],
})
export class EditStandingOrderComponent implements OnInit {
  paymentTypes$: Observable<PaymentType[]>;
  
  constructor(
    public editService: EditService,
    ) {}

  ngOnInit(): void {
    
    
  }



 
}
