import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LineOfBusiness } from 'src/app/models/line-of-business';
import { SearchPolicyRequest } from 'src/app/models/search-policy-request';
import { SearchPolicyResponse } from 'src/app/models/search-policy-response';
import { DataService } from 'src/app/services/data.service';
import { CreateStandingService } from '../create-standing.service';

@Component({
  selector: 'app-search-policy',
  templateUrl: './search-policy.component.html',
  styleUrls: ['./search-policy.component.scss']
})
export class SearchPolicyComponent  implements OnInit {
  public linesOfBusinesses$: Observable<LineOfBusiness[]>;
  searchPolicyResponse$: Observable<SearchPolicyResponse[]>;
  createForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private createStandingService:CreateStandingService,public dataService: DataService, private router: Router) {
    this.linesOfBusinesses$ = this.dataService.searchLinesOfBusiness();
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
    this.createStandingService.searchPolicy(searchPolicyRequest).subscribe((res: SearchPolicyResponse) => {

      console.log(res)
      // for(let item in res){
      //  res[item]? this.createForm.controls[item]?.setValue(res[item]):this.createForm.controls[item]?.setValue('');
      // }
      // this.dataService.hasPolicyResponse =true;
      this.router.navigate(['/create/create-order'])
    },
    error=>{
      console.log(error)
    }
    );
  }
  creationalSubmit(){
    console.log(this.createForm)
  }
}
