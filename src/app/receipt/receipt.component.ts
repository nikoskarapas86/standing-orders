import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LineOfBusiness } from 'src/app/models/line-of-business';
import { DataService } from 'src/app/services/data.service';
import { ModalComponent } from '../modal/modal.component';
import { PaymentType } from '../models/payment-type';
import { ReceiptRequest } from '../models/receipt-request';
import { ReceiptStatus } from '../models/receipt-status';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReceiptComponent implements OnInit {
  receiptForm: FormGroup;
  linesOfBusinesses$: Observable<LineOfBusiness[]>;
  receiptStatuses$: Observable<ReceiptStatus[]>;
  paymentTypes: PaymentType[];

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
    this.linesOfBusinesses$ = this.dataService.lineOfbusinesses$;
    this.receiptStatuses$ = this.dataService.searchReceiptStatuses();
    this.receiptStatuses$.subscribe(res => {
      this.dataService.receiptStatuses = res;
    });
    this.dataService.getPaymentTypes().subscribe(res => {
      this.paymentTypes = res;
      this.dataService.paymentTypes = res;
    });
  }

  private buildFormGroup(): void {
    this.receiptForm = this.formBuilder.group({
      lineOfBusiness: [null, Validators.required],
      policyNumber: [null, Validators.required],
      paymentType: null,
      billingStartDate: null,
      billingEndDate: null,
      issueStartDate: null,
      issueEndDate: null,
      status: null,
    });
  }

  onSubmit(): void {
    let receiptRequest = new ReceiptRequest();
    // receiptRequest.billingStartDate = this.receiptForm.value?.billingStartDate
    //   ? moment(this.receiptForm.value?.billingStartDate).format('DD/MM/YYYY')
    //   : null;
    // receiptRequest.billingEndDate = this.receiptForm.value?.billingEndDate
    //   ? moment(this.receiptForm.value?.billingEndDate).format('DD/MM/YYYY')
    //   : null;
    // receiptRequest.issueStartDate = this.receiptForm.value?.issueStartDate
    //   ? moment(this.receiptForm.value?.issueStartDate).format('DD/MM/YYYY')
    //   : null;
    // receiptRequest.issueEndDate = this.receiptForm.value?.issueEndDate
    //   ? moment(this.receiptForm.value?.issueEndDate).format('DD/MM/YYYY')
    //   : null;
    // receiptRequest.paymentType = this.receiptForm.value.paymentType;
    // receiptRequest.lineOfBusiness = this.receiptForm.value.lineOfBusiness;
    // receiptRequest.policyNo = this.receiptForm.value.policyNumber;
    // receiptRequest.status = 'PAY';

    receiptRequest = {
      policyNo: 61000030,
      lineOfBusiness: 'AUTO',
      billingStartDate: '27/05/2021',
      billingEndDate: '27/07/2021',
      issueStartDate: '10/06/2020',
      issueEndDate: '10/06/2020',
      status: 'PAY',
      paymentType: 'CREDIT_CARD',
    };
    this.dataService.receiptRequest = receiptRequest;
    this.dataService.receiptSearch(receiptRequest).subscribe(
      res => {
        this.dataService.setReceiptsSearchSubject(res);
      },
      error => {
        this.matDialog.open(ModalComponent, { data: error });
      }
    );
  }

  clear() {
    this.receiptForm.reset();
  }

  backHome(): void {
    this.router.navigate(['/home']);
  }
}
