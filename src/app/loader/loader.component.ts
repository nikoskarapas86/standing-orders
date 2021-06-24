import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientContainerService } from '../services/client-container-service';
import { MastercardService } from '../services/mastercard.service';

import { MatProgressSpinner, MatSpinnerStatus, MatSpinnerStatusContent } from '../shared/enums';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnDestroy, AfterViewInit {
  private subscriptions$: Subscription[] = [];
  spinnerMode: MatProgressSpinner;
  spinnerStatus = MatSpinnerStatus.IN_PROGRESS;
  spinnerStatusContent = MatSpinnerStatusContent.IN_PROGRESS_CONTENT;
  tokenExpired: string;
  diameter: number;
  strokeWidth: number;
  token: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private clientContainerService: ClientContainerService,
    private route: ActivatedRoute,
    private router: Router,
    private mastercardService: MastercardService
  ) {}

  ngAfterViewInit(): void {
    this.initialPayment();
    this.clientContainerService.isFailed$.subscribe(isFailed => {
      isFailed ? this.showActionFailed() : this.showActionInProgress();
    });
    this.resizeLoader();
  }

  private resizeLoader(): void {
    const screenSize$ = this.breakpointObserver
      .observe('(max-width: 768px)')
      .subscribe(({ matches }) => {
        if (matches) {
          this.diameter = 80;
          this.strokeWidth = 2;
        } else {
          this.diameter = 212;
          this.strokeWidth = 7;
        }
      });
    this.subscriptions$.push(screenSize$);
  }

  private initialPayment(): void {
    this.route.queryParams.subscribe(params => {
      this.mastercardService.initialPayment(params.searchId, params.status).subscribe(
        res => {
          this.clientContainerService.initialPaymentResponse = res;
          this.router.navigateByUrl('/complete');
        },
        error => {
          this.clientContainerService.isFailedSubject.next(true);
        }
      );
    });
  }

  private showActionInProgress(): void {
    this.spinnerStatus = MatSpinnerStatus.IN_REDIRECT;
    this.spinnerMode = MatProgressSpinner.INDETERMINATE;
    this.spinnerStatusContent = MatSpinnerStatusContent.IN_PROGRESS_CONTENT;
  }

  private showActionFailed(): void {
    this.spinnerStatus = MatSpinnerStatus.WARNING;
    this.spinnerMode = MatProgressSpinner.DETERMINATE;
    this.spinnerStatusContent = MatSpinnerStatusContent.WARNING_CONTENT;
    // this.sendErrorInfoToGoogleAnalytics(paymentMethod);
  }

  ngOnDestroy(): void {
    if (this.subscriptions$.length > 0) {
      this.subscriptions$.forEach(subscription => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    }
  }
}
