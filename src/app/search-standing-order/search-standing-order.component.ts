import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ModalComponent } from '../modal/modal.component';
import { LineOfBusiness } from '../models/line-of-business';
import { SearchRequest } from '../models/search-request';
import { SearchItem, SearchResponse } from '../models/search-response';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';
import { SearchService } from '../services/search.service';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

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
  searchBtnDisabled: boolean = false;
  searchId: string;
  standingOrders$: Observable<any[]>;
  minDate = moment().subtract(3, 'months').toDate();
  paymentTypes = [
    { id: 'BANK_ACCOUNT', name: 'Τρ. Λογαριασμός' },
    { id: 'CREDIT_CARD', name: 'Κάρτα' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    private searchService: SearchService,
    public dialog: MatDialog,
    private readonly destroy$: DestroyService,
    private _adapter: DateAdapter<any>,
    private router: Router
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
          this.dataService.setStandingOrdersSubject(undefined);
          this.searchBtnDisabled = false;
          this.standingOrders$ = this.dataService.standingOrders$;
          this.dialog.open(ModalComponent, { data: error });
        },
        () => {
          this.searchBtnDisabled = false;
        }
      );
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
