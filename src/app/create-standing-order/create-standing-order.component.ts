import { FocusTrap } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LineOfBusiness } from '../models/line-of-business';
import { SearchPolicyRequest } from '../models/search-policy-request';
import { SearchPolicyResponse } from '../models/search-policy-response';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-standing-order',
  templateUrl: './create-standing-order.component.html',
  styleUrls: ['./create-standing-order.component.scss'],
})
export class CreateStandingOrderComponent implements OnInit, AfterViewInit {
  public linesOfBusinesses$: Observable<LineOfBusiness[]>;
  searchPolicyResponse$: Observable<SearchPolicyResponse[]>;
  createForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public dataService: DataService) {
    this.linesOfBusinesses$ = this.dataService.searchLinesOfBusiness();
  }
  ngAfterViewInit() {
    console.log(!!this.dataService.getValueSearchPolicySubject())
  }
  ngOnInit(): void {
    this.buildFormGroup();

  }
  private buildFormGroup(): void {
    this.createForm = this.formBuilder.group({
      lineOfBusiness: null,
      policyNo: null,
      firstName:[{value: null, disabled: true}],
      agent:[{value: null}],
      lastName:[{value: null, disabled: true}],
      address:[{value: null, disabled: true}],
      city:null,
      postalCode:null,
      endorsement: '',
      phone:[{value: null, disabled: true}],
      email:[{value: null}],
    });
  }
  searchSubmit() {
    console.log(this.createForm.value);
    let searchPolicyRequest: SearchPolicyRequest = new SearchPolicyRequest();
    searchPolicyRequest.policyNo = this.createForm.value.policyNo;
    searchPolicyRequest.lineOfBusiness = this.createForm.value.lineOfBusiness;
    searchPolicyRequest.endorsement = this.createForm.value.endorsement;
    this.dataService.searchPolicy(searchPolicyRequest).subscribe((res: SearchPolicyResponse) => {

      console.log(res)
      for(let item in res){
       res[item]? this.createForm.controls[item]?.setValue(res[item]):this.createForm.controls[item]?.setValue('');
      }
      this.dataService.hasPolicyResponse =true;
    },
    error=>{}
    );
  }
  creationalSubmit(){
    console.log(this.createForm)
  }


}
