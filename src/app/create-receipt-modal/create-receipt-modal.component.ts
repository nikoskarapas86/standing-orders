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
      billingDate: this.data.billingDate,
      issueDate: this.data.issueDate,
      paymentDate: this.data.paymentDate,
      bankResponseDate: this.data.bankResponseDate,
      registerDate: this.data.registerDate,
      reversalNo: this.data.reversalNo,
      reversalNo2: this.data.reversalNo2,
      collectionTries: this.data.collectionTries,
      orderNo: this.data.orderNo,
      loanNo: this.data.loanNo,
    });
  }

  onSubmit(): void {
    const request = {
      ...this.receiptForm.value,
      billingDate: this.datePipe.transform(
        this.receiptForm.controls.billingDate.value,
        'dd/MM/yyyy'
      ),
      // TODO: install moment and substitute
      // billingDate: moment(this.receiptForm.controls.billingDate.value)
      //   .add(3, 'hours')
      //   .format('MM/DD/YYYY'),
      issueDate: this.datePipe.transform(this.receiptForm.controls.issueDate.value, 'dd/MM/yyyy'),
      paymentDate: this.datePipe.transform(
        this.receiptForm.controls.paymentDate.value,
        'dd/MM/yyyy'
      ),
      bankResponseDate: this.datePipe.transform(
        this.receiptForm.controls.bankResponseDate.value,
        'dd/MM/yyyy'
      ),
      registerDate: this.datePipe.transform(
        this.receiptForm.controls.registerDate.value,
        'dd/MM/yyyy'
      ),
    };
    this.dataService.receiptCreate(request).subscribe(res => {
      this.dismiss();

      this.dataService.receiptSearch(this.dataService.receiptRequest).subscribe(
        res => {
          this.dataService.setReceiptsSearchSubject(res);
        },
        error => {
          this.matDialog.open(ModalComponent, { data: error });
        }
      );
    });
  }
}
