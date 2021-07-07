import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Receipt } from '../models/receipt-search-response';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-receipt-modal',
  templateUrl: './create-receipt-modal.component.html',
  styleUrls: ['./create-receipt-modal.component.scss'],
})
export class CreateReceiptModalComponent implements OnInit {
  receiptForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Receipt,
    private dialogRef: MatDialogRef<CreateReceiptModalComponent>,
    private dataService: DataService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  dismiss() {
    this.dialogRef.close(false);
  }

  private initForm(): void {
    this.receiptForm = this.formBuilder.group({
      status: this.data.status,
      lineOfBusiness: this.data.lineOfBusiness,
      policyNo: this.data.policyNo,
      checkDigit: this.data.checkDigit,
      endorsement: this.data.endorsement,
      receipt: this.data.receipt,
      paymentType: this.data.paymentType,
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
      paymentDate: this.data.issueDate,
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
    this.dataService.receiptCreate(this.receiptForm.value).subscribe(res => {
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
