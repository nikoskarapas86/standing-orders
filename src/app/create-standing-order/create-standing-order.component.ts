import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LineOfBusiness } from '../models/line-of-business';
import { SearchPolicyRequest } from '../models/search-policy-request';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-standing-order',
  templateUrl: './create-standing-order.component.html',
  styleUrls: ['./create-standing-order.component.scss'],
})
export class CreateStandingOrderComponent implements OnInit {
  public linesOfBusinesses$: Observable<LineOfBusiness[]>;
  createForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public dataService: DataService) {
    this.linesOfBusinesses$ = this.dataService.searchLinesOfBusiness();
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }
  private buildFormGroup(): void {
    this.createForm = this.formBuilder.group({
      lineOfBusiness: null,
      policyNo: null,
      endorsement: '',
    });
  }
  submit() {
    console.log(this.createForm.value);
    let searchPolicyRequest: SearchPolicyRequest = new SearchPolicyRequest();
    searchPolicyRequest.policyNo = this.createForm.value.policyNo;
    searchPolicyRequest.lineOfBusiness = this.createForm.value.lineOfBusiness;
    searchPolicyRequest.endorsement = this.createForm.value.endorsement;
    this.dataService.searchPolicy(searchPolicyRequest).subscribe(res => console.log(res));
  }
}
