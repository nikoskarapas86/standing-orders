import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LineOfBusiness } from '../models/line-of-business';
import { SearchRequest } from '../models/search-request';
import { SearchItem } from '../models/search-response';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-standing-order',
  templateUrl: './search-standing-order.component.html',
  styleUrls: ['./search-standing-order.component.scss'],
  providers: [DestroyService],
})
export class SearchStandingOrderComponent implements OnInit {
  searchForm: FormGroup;
  linesOfBusiness$: Observable<LineOfBusiness[]>;
  standingOrders: SearchItem[];
  searchId: string;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private searchService: SearchService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
    this.linesOfBusiness$ = this.dataService.searchLinesOfBusiness();
    this.searchService.getIsDeleteCalled.subscribe(res => {
      if (res) {
        this.submit();
        this.searchService.isDeleteCalled = false;
      }
    });
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
    // const request: SearchRequest = {
    //   policyNo: 1389945,
    //   lineOfBusiness: null,
    //   paymentType: null,
    //   paymentId: null,
    //   bankAccount: null,
    //   customerLastName: null,
    //   agent: null,
    //   startDate: null,
    //   endDate: null,
    //   endorsement: null,
    // };

    const request: SearchRequest = {
      policyNo: this.searchForm.get('policyNumber').value,
      lineOfBusiness: this.searchForm.get('lineOfBusiness').value,
      paymentType: this.searchForm.get('paymentType').value,
      paymentId: this.searchForm.get('paymentId').value,
      bankAccount: this.searchForm.get('bankAccount').value,
      customerLastName: this.searchForm.get('customerLastName').value,
      agent: this.searchForm.get('agent').value,
      startDate: this.searchForm.get('payDateFrom').value,
      endDate: this.searchForm.get('payDateTo').value,
      endorsement: this.searchForm.get('endorsement').value,
    };

    this.dataService
      .searchStandingOrder(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.searchId = res.searchId;
          this.standingOrders = res.standingOrderDTOList;
        },
        error => {}
      );
  }

  resetForm() {
    this.searchForm.reset();
  }
}
