import { Component, OnInit } from '@angular/core';
import { PolicyDetailService } from '../policy-details.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-policy-detail-form',
  templateUrl: './policy-detail-form.component.html',
  styleUrls: ['./policy-detail-form.component.scss']
})
export class PolicyDetailFormComponent implements OnInit {

  policyForm: FormGroup

  constructor(
    private policyDetailService:PolicyDetailService,
    private formBuilder: FormBuilder) {
      this.policyFormGroup()
     }

     policyFormGroup(){
      this.policyForm = this.formBuilder.group({
        lastName:  [{ value: '', disabled: true }],
        firstName:  [{ value: '', disabled: true }],
        lineOfBusiness:  [{ value: '', disabled: true }]
      })
     }


     fillPolicylForm(res) {
  
      for (let item in res) {
        res[item] ? this.policyForm.controls[item]?.setValue(res[item]) : this.policyForm.controls[item]?.setValue(null);
      }
    }

  ngOnInit(): void {
    this.policyDetailService.policy$.subscribe(res => this.fillPolicylForm(res))
  }



  next(){
    
  }
}
