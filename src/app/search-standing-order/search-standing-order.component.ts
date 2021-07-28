import 'moment/locale/el';

import * as moment from 'moment';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchItem, SearchResponse } from '../models/search-response';

import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';
import { LineOfBusiness } from '../models/line-of-business';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Observable } from 'rxjs';
import { PaymentType } from '../models/payment-type';
import { Router } from '@angular/router';
import { SearchRequest } from '../models/search-request';
import { SearchService } from '../services/search.service';
import { takeUntil } from 'rxjs/operators';

// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import {
//   MAT_MOMENT_DATE_ADAPTER_OPTIONS,
//   MAT_MOMENT_DATE_FORMATS,
//   MomentDateAdapter,
// } from '@angular/material-moment-adapter';
// { provide: MAT_DATE_LOCALE, useValue: 'el-EL' },
// {
//   provide: DateAdapter,
//   useClass: MomentDateAdapter,
//   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
// },
// { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },

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
  paymentTypes$: Observable<PaymentType[]>;
  standingOrders: SearchItem[];
  searchBtnDisabled: boolean = false;
  searchId: string;
  standingOrders$: Observable<any[]>;
  minDate = moment().subtract(3, 'months').toDate();

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    private searchService: SearchService,
    public dialog: MatDialog,
    private readonly destroy$: DestroyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    moment.locale('el');
    this.buildFormGroup();
    this.linesOfBusinesses$ = this.dataService.lineOfbusinesses$;
    this.paymentTypes$ = this.dataService.getPaymentTypes();
    this.searchService.getIsDeleteCalled.subscribe(res => {
      if (res) {
        this.submit();
        this.searchService.isDeleteCalled = false;
      }
    });

    if (this.dataService.searchRequest) {
      this.fetchSearchResults();
      this.searchForm = this.dataService.searchForm;
    }
  }

  private buildFormGroup(): void {
    this.searchForm = this.formBuilder.group({
      lineOfBusiness: [null, Validators.required],
      policyNumber: null,
      paymentType: null,
      paymentId: null,
      bankAccount: null,
      customerLastName: null,
      customerFirstName: null,
      agent: null,
      payDateFrom: [new Date().toISOString().substring(0, 10), Validators.required],
      payDateTo: [new Date().toISOString().substring(0, 10), [Validators.required]],
      endorsement: null,
    });
  }

  private createSubmitRequest(): void {
    const tempStartDate = this.searchForm.get('payDateFrom').value;
    const tempEndDate = this.searchForm.get('payDateTo').value;
    const startDate = tempStartDate ? moment(tempStartDate).format('DD/MM/YYYY') : null;
    const endDate = tempEndDate ? moment(tempEndDate).format('DD/MM/YYYY') : null;
    this.dataService.setStandingOrdersSubject(undefined);
    const request: SearchRequest = {
      policyNo: this.searchForm.get('policyNumber').value,
      lineOfBusiness: this.searchForm.get('lineOfBusiness').value,
      paymentType: this.searchForm.get('paymentType').value,
      paymentId: this.searchForm.get('paymentId').value,
      bankAccount: this.searchForm.get('bankAccount').value,
      customerLastName: this.searchForm.get('customerLastName').value,
      agent: this.searchForm.get('agent').value,
      customerFirstName: this.searchForm.get('customerFirstName').value,
      startDate,
      endDate,
      endorsement: this.searchForm.get('endorsement').value,
    };
    this.dataService.searchRequest = request;
    this.dataService.searchForm = this.searchForm;
  }

  submit(): void {
    this.dataService.setStandingOrdersSubject(undefined);
    this.dataService.resultsLoadingSubject.next(true);
    this.searchBtnDisabled = true;
    this.dataService
      .searchStandingOrder(this.dataService.searchRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: SearchResponse) => {
          this.searchId = res.searchId;
          this.dataService.setStandingOrdersSubject(res);
          this.standingOrders$ = this.dataService.standingOrders$;
        },
        error => {
          this.errorHandler(error);
        },
        () => {
          this.searchBtnDisabled = false;
          this.dataService.resultsLoadingSubject.next(false);
        }
      );
  }

  errorHandler(error) {
    this.dataService.setStandingOrdersSubject(undefined);
    this.searchBtnDisabled = false;
    this.standingOrders$ = this.dataService.standingOrders$;
    this.dialog.open(ModalComponent, { data: error });
  }

  fetchSearchResults(): void {
    if (!this.dataService.searchRequest) this.createSubmitRequest();
    this.submit();
  }

  onSubmit(): void {
    this.createSubmitRequest();
    this.submit();
  }

  resetForm() {
    this.searchForm.reset();
    this.searchForm.get('payDateFrom').setValue(new Date().toISOString().substring(0, 10));
    this.searchForm.get('payDateTo').setValue(new Date().toISOString().substring(0, 10));
  }

  backHome(): void {
    this.dataService.searchForm = undefined;
    this.dataService.searchRequest = undefined;
    this.router.navigate(['/home']);
  }
}
