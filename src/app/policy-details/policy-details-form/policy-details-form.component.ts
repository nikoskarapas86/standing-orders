import { Component, OnInit } from '@angular/core';
import { PolicyDetailsService } from '../policy-details.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientContainerService } from 'src/app/services/client-container-service';

@Component({
  selector: 'app-policy-details-form',
  templateUrl: './policy-details-form.component.html',
  styleUrls: ['./policy-details-form.component.scss'],
})
export class PolicyDetailsFormComponent implements OnInit {
  policyForm: FormGroup;
  searchId: string;

  constructor(
    private policyDetailsService: PolicyDetailsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private clientContainerService: ClientContainerService
  ) {
    this.policyFormGroup();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchId = params.searchId;
    });

    this.policyDetailsService.policy$.subscribe(res => {
      this.fillPolicylForm(res);
    });
  }

  policyFormGroup() {
    this.policyForm = this.formBuilder.group({
      policyNo: [{ value: '', disabled: true }],
    });
  }

  fillPolicylForm(res) {
    for (let item in res) {
      res[item]
        ? this.policyForm.controls[item]?.setValue(res[item])
        : this.policyForm.controls[item]?.setValue(null);
    }
  }

  next() {
    this.clientContainerService.setStep(1);
    this.router.navigate([`/creditcard/${this.searchId}`]);
  }
}
