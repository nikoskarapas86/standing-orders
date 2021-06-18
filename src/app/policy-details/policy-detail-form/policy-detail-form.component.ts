import { Component, OnInit } from '@angular/core';
import { PolicyDetailService } from '../policy-details.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'node:console';

@Component({
  selector: 'app-policy-detail-form',
  templateUrl: './policy-detail-form.component.html',
  styleUrls: ['./policy-detail-form.component.scss'],
})
export class PolicyDetailFormComponent implements OnInit {
  policyForm: FormGroup;
  searchId: string;

  constructor(
    private policyDetailService: PolicyDetailService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.policyFormGroup();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchId = params.searchId;
    });

    this.policyDetailService.policy$.subscribe(res => {
   console.log(res)
      this.fillPolicylForm(res);
    });
  }

  policyFormGroup() {
    this.policyForm = this.formBuilder.group({
      policyNo: [{ value: '', disabled: true }],
      // firstName: [{ value: '', disabled: true }],
      // lineOfBusiness: [{ value: '', disabled: true }],
    });
  }

  fillPolicylForm(res) {
    for (let item in res) {
      console.log('IIIITTTTTYEEEEMMMMMM',item)
      res[item]
        ? this.policyForm.controls[item]?.setValue(res[item])
        : this.policyForm.controls[item]?.setValue(null);
    }
  }

  next() {
    this.router.navigate([`/creditcard/${this.searchId}`]);
  }
}
