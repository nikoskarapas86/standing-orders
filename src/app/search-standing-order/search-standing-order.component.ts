import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LineOfBusiness } from '../models/line-of-business';
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

  submit(): void {}
}
