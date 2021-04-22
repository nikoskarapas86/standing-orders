import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LineOfBusiness } from '../models/line-of-business';
import { SearchRequest } from '../models/search-request';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search-standing-order',
  templateUrl: './search-standing-order.component.html',
  styleUrls: ['./search-standing-order.component.scss'],
})
export class SearchStandingOrderComponent implements OnInit {
  searchForm: FormGroup;
  linesOfBusiness$: Observable<LineOfBusiness[]>;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.buildFormGroup();
    this.linesOfBusiness$ = this.dataService.searchLinesOfBusiness();
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
    console.log(this.searchForm.value);
    // const request: SearchRequest = {
    //   policyNo: 1389945,
    //   lineOfBusiness: 'LIFE',
    //   paymentType: 'BANK_ACCOUNT',
    //   paymentId: 10882690,
    //   bankAccount: '01389945000000062916',
    //   customerLastName: 'ΠΟΥΜΠΟΥΡΙΔΗΣ             ',
    //   agent: 99999,
    //   startDate: '2020-09-09',
    //   endDate: '2100-12-31',
    //   endorsement: 'Μ128788',
    // };

    const request: SearchRequest = {
      policyNo: this.searchForm.get('policyNo').value,
      lineOfBusiness: this.searchForm.get('policyNo').value.lineOfBusiness,
      paymentType: this.searchForm.get('paymentType').value,
      paymentId: this.searchForm.get('paymentId').value,
      bankAccount: this.searchForm.get('bankAccount').value,
      customerLastName: this.searchForm.get('customerLastName').value,
      agent: this.searchForm.get('agent').value,
      startDate: this.searchForm.get('startDate').value,
      endDate: this.searchForm.get('endDate').value,
      endorsement: this.searchForm.get('endorsment').value,
    };

    this.dataService.searchStandingOrder(request).subscribe(res => {
      console.log(res);
    });
  }
}
