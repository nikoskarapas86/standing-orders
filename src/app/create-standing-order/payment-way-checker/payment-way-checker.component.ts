import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentType } from 'src/app/models/payment-type';
import { SearchPolicyResponse } from 'src/app/models/search-policy-response';
import { DataService } from 'src/app/services/data.service';
import { CreateStandingService } from '../create-standing.service';

@Component({
  selector: 'app-payment-way-checker',
  templateUrl: './payment-way-checker.component.html',
  styleUrls: ['./payment-way-checker.component.scss']
})
export class PaymentWayCheckerComponent implements OnInit {
  paymentWayForm: FormGroup;
  items: FormArray;
  paymentTypes$: Observable<PaymentType[]>;
  paymentType: string;
  constructor(private formBuilder: FormBuilder,
    private createStandingService: CreateStandingService,
    private dataService: DataService,
    private router: Router
  ) {
    this.paymentTypes$ = this.createStandingService.getPaymentTypes()

  }

  ngOnInit(): void {
    // this.buildFormGroup();
    // this.dataService.searchPolicyResponse$.subscribe((res: SearchPolicyResponse) => { !res ? this.router.navigate(['/create/search-policy']) : null })
  }

  private buildFormGroup(): void {
    this.paymentWayForm = this.formBuilder.group({
      paymentType: null,

    })
  }
  paymentWayChoise(event) {
    console.log(event.value)
    this.paymentType = event.value

  }



  createIbanItems(): FormGroup {
    return this.formBuilder.group({
      cardNumber: '',
      cardExpiryMonth: '',
      cardExpiryYear: ''
    });
  }
}


