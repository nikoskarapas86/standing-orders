import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
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
  public today:Date = new Date();
  lineOfBussinesses$: Observable<LineOfBusiness[]>;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Receipt,
    public dialogRef: MatDialogRef<UpdateReceiptModalComponent>,
    private matDialog: MatDialog,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    if (!this.dataService.receiptRequest) {
      this.dismiss();
     
    }

    this.initForm();
    this.lineOfBussinesses$ = this.dataService.lineOfbusinesses$;
  }

  private initForm(): void {
    this.amountForm = this.formBuilder.group({
      amount: this.data.amount,
      billingDate:null,
    });
  }

  onSubmit(): void {
    console.log('update')
    const { policyNo, receipt, installments, endorsement } = this.data;
    this.lineOfBussinesses$.subscribe(res => {
      let item: any = res.filter(item => item.title == this.data.lineOfBusiness);
      let lineOfBusiness = item[0].lineOfBusiness;
      const request = {
        key: {
          lineOfBusiness,
          policyNo,
          receipt,
          installments,
          endorsement,
        },
        amount: this.amountForm.get('amount').value,
        billingDate:  moment(this.amountForm.get('billingDate').value).format('DD/MM/YYYY'),
      };
    
      this.dataService.receiptRepay(request).subscribe(res => {
        this.dismiss();

        this.dataService.receiptSearch(this.dataService.receiptRequest).subscribe(
          res => {
            this.dataService.setReceiptsSearchSubject(res);
          },
          error => {
            this.matDialog.open(ModalComponent, { data: error });
            this.dismiss();
          }
        );
      },
      error => {
        this.matDialog.open(ModalComponent, { data: error });
        this.dismiss();
      }
      
      );
    });
  }

  dismiss() {
    this.dialogRef.close(false);
  }
}
