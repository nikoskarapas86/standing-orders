import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ModalComponent } from '../modal/modal.component';
import { LineOfBusiness } from '../models/line-of-business';
import { SearchRequest } from '../models/search-request';
import { SearchItem } from '../models/search-response';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';
import { SearchService } from '../services/search.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-search-standing-order',
  templateUrl: './search-standing-order.component.html',
  styleUrls: ['./search-standing-order.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DestroyService],
})
export class SearchStandingOrderComponent implements OnInit {
  searchForm: FormGroup;
  linesOfBusinesses$: Observable<LineOfBusiness[]>;
  standingOrders: SearchItem[];
  searchId: string;
  standingOrders$: Observable<any[]>;
  minDate = moment().subtract(3, 'months').toDate();

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    private searchService: SearchService,
    public dialog: MatDialog,
    private readonly destroy$: DestroyService,
    private _adapter: DateAdapter<any>
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
    this.linesOfBusinesses$ = this.dataService.searchLinesOfBusiness();
    this.searchService.getIsDeleteCalled.subscribe(res => {
      if (res) {
        this.submit();
        this.searchService.isDeleteCalled = false;
      }
    });
    this._adapter.setLocale('el');
  }

  private buildFormGroup(): void {
    this.searchForm = this.formBuilder.group({
      lineOfBusiness: null,
      policyNumber: null,
      paymentType: null,
      paymentId: null,
      bankAccount: null,
      customerLastName: null,
      agent: null,
      payDateFrom: new Date().toISOString().substring(0, 10),
      payDateTo: new Date().toISOString().substring(0, 10),
      endorsement: null,
    });
  }

  submit(): void {
    const tempStartDate = this.searchForm.get('payDateFrom').value;
    const tempEndDate = this.searchForm.get('payDateTo').value;
    const startDate = tempStartDate ? moment(tempStartDate).format('YYYY-MM-DD') : null;
    const endDate = tempEndDate ? moment(tempEndDate).format('YYYY-MM-DD') : null;

    this.dataService.setStandingOrdersSubject(undefined);
    console.log(this.searchForm.get('payDateFrom').value);
    const request: SearchRequest = {
      policyNo: this.searchForm.get('policyNumber').value,
      lineOfBusiness: this.searchForm.get('lineOfBusiness').value,
      paymentType: this.searchForm.get('paymentType').value,
      paymentId: this.searchForm.get('paymentId').value,
      bankAccount: this.searchForm.get('bankAccount').value,
      customerLastName: this.searchForm.get('customerLastName').value,
      agent: this.searchForm.get('agent').value,
      startDate,
      endDate,
      endorsement: this.searchForm.get('endorsement').value,
    };

    this.dataService
      .searchStandingOrder(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.searchId = res.searchId;
          this.dataService.setStandingOrdersSubject(res.standingOrderDTOList);
          this.standingOrders$ = this.dataService.standingOrders$;
        },
        error => {
          this.dialog.open(ModalComponent, { data: error });
        }
      );
  }

  resetForm() {
    this.searchForm.reset();
  }
}
