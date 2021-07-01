import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LineOfBusiness } from 'src/app/models/line-of-business';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReceiptComponent implements OnInit {
  receiptForm: FormGroup;
  linesOfBusinesses$: Observable<LineOfBusiness[]>;
  paymentTypes = [
    { id: 'BANK_ACCOUNT', name: 'Τρ. Λογαριασμός' },
    { id: 'CREDIT_CARD', name: 'Κάρτα' },
  ];

  // "policyNo": 52617933,
  // "lineOfBusiness": "AUTO",
  // "billingStartDate": "27/12/2012",
  // "billingEndDate": "27/12/2012",
  // "issueStartDate": "05/07/2013",
  // "issueEndDate": "05/07/2013",
  // "status": "PAY", 
  // "paymentType": "BANK_ACCOUNT"



  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildFormGroup();
    this.linesOfBusinesses$ = this.dataService.searchLinesOfBusiness();
  }

  private buildFormGroup(): void {
    this.receiptForm = this.formBuilder.group({
      lineOfBusiness: [null, Validators.required],
      policyNumber: [null, Validators.required],
      paymentType: null,
      billingStartDate: null,
      billingEndDate: null,
      // issueStartDate: null,
      // issueEndDate: null,
      // status: null, 
    });
  }
  onSubmit(): void {
    console.log('submited');
  }
  clear() {
    console.log('works')
  }
  backHome(): void {
    this.router.navigate(['/home']);
  }



}
