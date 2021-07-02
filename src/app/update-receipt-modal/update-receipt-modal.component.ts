import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Receipt } from '../models/receipt-search-response';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-update-receipt-modal',
  templateUrl: './update-receipt-modal.component.html',
  styleUrls: ['./update-receipt-modal.component.scss'],
})
export class UpdateReceiptModalComponent implements OnInit {
  amountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Receipt,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formBuilder.group({
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

  dismiss(){}
  
}
