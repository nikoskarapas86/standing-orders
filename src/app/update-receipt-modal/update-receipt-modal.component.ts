import { Component, Inject, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Receipt } from '../models/receipt-search-response';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-update-receipt-modal',
  templateUrl: './update-receipt-modal.component.html',
  styleUrls: ['./update-receipt-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateReceiptModalComponent implements OnInit {
  @ViewChild('modalContent', { read: ViewContainerRef })
  amountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Receipt,
    public dialogRef: MatDialogRef<UpdateReceiptModalComponent>,

    private dataService: DataService
  ) {}

  ngOnInit(): void {
    console.log(this.data.amount)
    this.initForm();
  }

  private initForm(): void {
  this.amountForm =  this.formBuilder.group({
      amount: this.data.amount,
    });
  }

  onSubmit(): void {
    const { lineOfBusiness, policyNo, receipt, installments, amount } = this.data;
    const request = {
      key: {
        lineOfBusiness,
        policyNo,
        receipt,
        installments,
      },
      amount,
    };

    this.dataService.receiptUpdate(request).subscribe(res => {
      console.log(res);
    });
  }

  dismiss(){
    this.dialogRef.close(false); 
  }

}
