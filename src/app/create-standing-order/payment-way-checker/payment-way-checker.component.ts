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
  policyResponseForm: FormGroup;
  displayEndorsment:boolean = true;
  dispalyFieldsOfPolicy:boolean = true;
  constructor(private formBuilder: FormBuilder,
    private createStandingService: CreateStandingService,
    private dataService: DataService,
    private router: Router
  ) {
    this.paymentTypes$ = this.createStandingService.getPaymentTypes()

  }




  ngOnInit(): void {
    this.builddisplayedFormGroup()
    this.dataService.searchPolicyResponse$.subscribe((res: SearchPolicyResponse) => {
      console.log(res)
      res ? this.fillPolicyResponseForm(res) :this.navigateBack()
    console.log(this.policyResponseForm.get('firstName').value)
    this.displayEndorsment = this.policyResponseForm.get('endorsement').value? true : false
    })
  
  }
navigateBack(){
  this.router.navigate(['/home']);
}

  fillPolicyResponseForm(res: SearchPolicyResponse) {
    for (let item in res) {
      res[item] ? this.policyResponseForm.controls[item]?.setValue(res[item]) : this.policyResponseForm.controls[item]?.setValue(null);
    }
  }


  private builddisplayedFormGroup(): void {
    this.policyResponseForm = this.formBuilder.group({
      address: [{value: '', disabled: true}],
      firstName: [{value: '', disabled: true}],
      lastName: [{value: '', disabled: true}],
      phone: [{value: '', disabled: true}],
      policyNo: [{value: '', disabled: true}],
      endorsement:[{value: '', disabled: true}]

    })
  }
  paymentWayChoise(event) {
    console.log(event.value)
    this.paymentType = event.value
    this.dispalyFieldsOfPolicy = false

  }



  createIbanItems(): FormGroup {
    return this.formBuilder.group({
      cardNumber: '',
      cardExpiryMonth: '',
      cardExpiryYear: ''
    });
  }
}


