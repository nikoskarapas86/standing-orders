import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';
import { PolicyDetailsService } from './policy-details.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss'],
  providers: [DestroyService],
})
export class PolicyDetailsComponent implements OnInit {
  @Input() isPolicyLoading = true;

  constructor(
    private route: ActivatedRoute,
    private policyDetailsService: PolicyDetailsService,
    private dataService: DataService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // TODO: check why is necessary when loading credit card
      if (params?.searchId) {
        this.dataService.status = params.status;
        this.dataService
          .getPolicyByEmail(params.searchId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            res => {
              this.policyDetailsService.policyResponse = res;
              this.policyDetailsService.isFailedSubject.next(false);
              this.isPolicyLoading = false;
            },
            error => {
              this.policyDetailsService.isFailedSubject.next(true);
            }
          );
      }
    });
  }
}
