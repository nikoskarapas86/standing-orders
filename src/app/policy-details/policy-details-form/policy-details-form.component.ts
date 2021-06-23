import { Component, OnInit } from '@angular/core';
import { PolicyDetailsService } from '../policy-details.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientContainerService } from 'src/app/services/client-container-service';
import { GetPolicyByEmailResponse } from 'src/app/models/get-policy-by-email-response';

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
  ) {}

  ngOnInit(): void {
    this.initPolicyForm();
    this.route.queryParams.subscribe(params => {
      this.searchId = params.searchId;
    });

    this.setPolicylForm(this.policyDetailsService.policyResponse);
  }

  initPolicyForm(): void {
    this.policyForm = this.formBuilder.group({
      policyNo: [{ value: null, disabled: true }],
    });
  }

  setPolicylForm(res: GetPolicyByEmailResponse): void {
    this.policyForm.patchValue({ policyNo: res.policyNo });
  }

  next() {
    this.clientContainerService.setStep(1);
    this.router.navigate([`/creditcard/${this.searchId}`]);
  }
}
