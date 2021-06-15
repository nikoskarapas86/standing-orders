import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';
import { PolicyDetailService } from './policy-details.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss'],
  providers: [DestroyService],
})
export class PolicyDetailsComponent implements OnInit {
  isPolicyLoading = true;

  constructor(
    private route: ActivatedRoute,
    private policyDetailService: PolicyDetailService,
    private dataService: DataService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.dataService.status = params.status;
      this.policyDetailService
        .getPolicyByEmail(params.searchId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          res => {
            this.policyDetailService.isFailedSubject.next(false);
            this.policyDetailService.setPolicySubject(res);
            this.isPolicyLoading = false;
          },
          error => {
            this.policyDetailService.isFailedSubject.next(true);
          }
        );
    });
  }
}
