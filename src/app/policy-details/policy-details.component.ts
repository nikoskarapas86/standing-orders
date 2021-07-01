import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetPolicyByEmailResponse } from '../models/get-policy-by-email-response';
import { ClientContainerService } from '../services/client-container-service';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss'],
  providers: [DestroyService],
})
export class PolicyDetailsComponent implements OnInit {
  policyForm: FormGroup;
  searchId: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private clientContainerService: ClientContainerService,
    private readonly destroy$: DestroyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('im here');
    this.initPolicyForm();
    // TODO: move to client-container
    this.route.queryParams.subscribe(params => {
      // TODO: check why is necessary when loading credit card
      if (params?.searchId) {
        this.searchId = params.searchId;
        this.dataService.status = params.status;
        this.dataService
          .getPolicyByEmail(params.searchId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            res => {
              this.clientContainerService.policyResponseSubject.next(true);
              this.clientContainerService.isFailedSubject.next(false);
              this.clientContainerService.isPolicyLoading = false;
            },
            error => {
              this.clientContainerService.isPolicyLoading = true;
              this.clientContainerService.isFailedSubject.next(true);
            },
            () => {
              this.clientContainerService.policyResponseSubject.next(false);
            }
          );
      }
    });
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
