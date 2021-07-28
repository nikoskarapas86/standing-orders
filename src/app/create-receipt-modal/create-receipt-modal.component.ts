import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { LineOfBusiness } from '../models/line-of-business';
import { Receipt } from '../models/receipt-search-response';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-receipt-modal',
  templateUrl: './create-receipt-modal.component.html',
  styleUrls: ['./create-receipt-modal.component.scss'],
  providers: [DatePipe],
})
export class CreateReceiptModalComponent implements OnInit {
  receiptForm: FormGroup;
  linesOfBusiness: LineOfBusiness[];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Receipt,
    private dialogRef: MatDialogRef<CreateReceiptModalComponent>,
    public dataService: DataService,
    private matDialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.dataService.lineOfbusinesses$.subscribe(res => {
      this.linesOfBusiness = res;
    });
  }

  dismiss() {
    this.dialogRef.close(false);
  }

  private initForm(): void {
    this.receiptForm = this.formBuilder.group({
      status: this.dataService.receiptStatuses.find(s => s.title === this.data.status)
        .receiptStatus,
      lineOfBusiness: this.dataService.lineOfbusinessesSubject.value.find(
        b => b.title === this.data.lineOfBusiness
      ).lineOfBusiness,
      policyNo: this.data.policyNo,
      checkDigit: this.data.checkDigit,
      endorsement: this.data.endorsement,
      receipt: this.data.receipt,
      paymentType: this.dataService.paymentTypes.find(t => t.title === this.data.paymentType)
        .paymentType,
      installments: this.data.installments,
      branchStore: this.data.branchStore,
      collectionAgency: this.data.collectionAgency,
      agent: this.data.agent,
      amount: this.data.amount,
      endorsementAmount: this.data.endorsementAmount,
      installmentAmount: this.data.installmentAmount,
      installment2Amount: this.data.installment2Amount,
      billingDate: new Date(this.changeMonthDayPosition(this.data.billingDate)),
      issueDate: new Date(this.changeMonthDayPosition(this.data.issueDate)),
      paymentDate: new Date(this.changeMonthDayPosition(this.data.paymentDate)),
      bankResponseDate: new Date(this.changeMonthDayPosition(this.data.bankResponseDate)),
      registerDate: new Date(this.changeMonthDayPosition(this.data.registerDate)),
      reversalNo: this.data.reversalNo,
      reversalNo2: this.data.reversalNo2,
      collectionTries: this.data.collectionTries,
      orderNo: this.data.orderNo,
      loanNo: this.data.loanNo,
    });
  }

  private changeMonthDayPosition(date: string): string {
    const day = date.substring(0, 2);
    const month = date.substring(3, 5);
    const year = date.substring(6, 10);
    return [month, day, year].join('/');
  }

  transformDate(field: string): string {
    return this.datePipe.transform(this.receiptForm.controls[field].value, 'dd/MM/yyyy');
  }

  onSubmit(): void {
    const request = {
      ...this.receiptForm.value,
      billingDate: this.transformDate('billingDate'),
      issueDate: this.transformDate('issueDate'),
      paymentDate: this.transformDate('paymentDate'),
      bankResponseDate: this.transformDate('bankResponseDate'),
      registerDate: this.transformDate('registerDate'),
    };
    this.dataService.receiptCreate(request).subscribe(
      res => {
        this.dismiss();

        this.dataService.receiptSearch(this.dataService.receiptRequest).subscribe(
          res => {
            this.dataService.setReceiptsSearchSubject(res);
          },
          error => {
            this.matDialog.open(ModalComponent, { data: error });
          }
        );
      },
      error => {
        this.matDialog.open(ModalComponent, { data: error });
      }
    );
  }
}
