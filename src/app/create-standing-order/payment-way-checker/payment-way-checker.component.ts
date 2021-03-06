import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalComponent } from 'src/app/modal/modal.component';
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
  paymentWay:string;
  policyResponseForm: FormGroup;
  displayEndorsment: boolean = true;
  dispalyFieldsOfPolicy: boolean = true;
  isIbanValid: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private createStandingService: CreateStandingService,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.paymentTypes$ = this.createStandingService.getPaymentTypes()

  }

  ibanvalid(event) {
    this.isIbanValid = event ? true : false
  }


  ngOnInit(): void {

    this.buildisplayedFormGroup()
    this.dataService.searchPolicyResponse$.subscribe((res: SearchPolicyResponse) => {
      res ? this.fillPolicyResponseForm(res) : this.navigateBack()
      this.displayEndorsment = this.policyResponseForm.get('endorsement').value ? true : false
    },
      error => {

        this.dialog.open(ModalComponent, { data: error });
      }
    )

  }
  navigateBack() {
    this.router.navigate(['/home']);
  }

  fillPolicyResponseForm(res: SearchPolicyResponse) {
    for (let item in res) {
      res[item] ? this.policyResponseForm.controls[item]?.setValue(res[item]) : this.policyResponseForm.controls[item]?.setValue(null);
    }
  }


  private buildisplayedFormGroup(): void {
    this.policyResponseForm = this.formBuilder.group({
      address: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      policyNo: [{ value: '', disabled: true }],
      endorsement: [{ value: '', disabled: true }]

    })
  }
  paymentWayChoise(event) {
    this.paymentWay =  event.value 
    
  }



  createIbanItems(): FormGroup {
    return this.formBuilder.group({
      cardNumber: '',
      cardExpiryMonth: '',
      cardExpiryYear: ''
    });
  }

  back() {
    this.router.navigate(['create/search-policy'])
  }
  next(){
   
    this.paymentWay === 'BANK_ACCOUNT' ?this.router.navigate(['create/iban']) :this.router.navigate(['create/email'])
    this.dispalyFieldsOfPolicy = false
  }
}


