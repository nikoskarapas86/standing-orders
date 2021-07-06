import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LineOfBusiness } from '../models/line-of-business';
import { Receipt } from '../models/receipt-search-response';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-update-receipt-modal',
  templateUrl: './update-receipt-modal.component.html',
  styleUrls: ['./update-receipt-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateReceiptModalComponent implements OnInit {
  amountForm: FormGroup;
  lineOfBussinesses$: Observable<LineOfBusiness[]>;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Receipt,
    public dialogRef: MatDialogRef<UpdateReceiptModalComponent>,

    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.lineOfBussinesses$ = this.dataService.lineOfbusinesses$;
  }

  private initForm(): void {
    this.amountForm = this.formBuilder.group({
      amount: this.data.amount,
    });
  }

  onSubmit(): void {
    const { policyNo, receipt, installments, amount } = this.data;
    this.lineOfBussinesses$.subscribe(res => {
      let item: any = res.filter(item => item.title == this.data.lineOfBusiness);
      let lineOfBusiness = item[0].lineOfBusiness;

      const request = {
        key: {
          lineOfBusiness,
          policyNo,
          receipt,
          installments,
        },
        amount,
      };
      this.dataService.receiptRepay(request).subscribe(res => {
        this.dismiss();
      });
    });
  }

  dismiss() {
    this.dialogRef.close(false);
  }
}
