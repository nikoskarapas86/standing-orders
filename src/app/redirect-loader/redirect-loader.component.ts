import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { PolicyDetailService } from '../policy-details/policy-details.service';

import {
  ContractInfoEventState,
  GoogleAnalytics,
  MatProgressSpinner,
  MatSpinnerStatus,
  MatSpinnerStatusContent,
  Modal,
  StepperEventState,
} from '../shared/enums';
// import ContractSearchInfo from '../../shared/models/contract-search-info';
// import { GoogleAnalyticsService } from '../../shared/services/google-analytics/google-analytics.service';
// import { HttpService } from '../../shared/services/http-service/http.service';
// import { KipService } from '../../shared/services/kip-service/kip.service';
// import { LanguageService } from '../../shared/services/language-service/language.service';
// import { RedirectLoaderService } from '../../shared/services/redirect-loader.service';
// import { TokenService } from '../../shared/services/token-service/token.service';
// import { ModalService } from '../../webpay-modal/modal.service';
// import { WebpayWizardService } from '../../webpay-process/webpay-wizard.service';

@Component({
  selector: 'app-redirect-loader',
  templateUrl: './redirect-loader.component.html',
  styleUrls: ['./redirect-loader.component.scss'],
})
export class RedirectLoaderComponent implements OnDestroy, AfterViewInit {
  private subscriptions$: Subscription[] = [];
  spinnerMode: MatProgressSpinner;
  spinnerStatus = MatSpinnerStatus.IN_PROGRESS;
  spinnerStatusContent = MatSpinnerStatusContent.IN_PROGRESS_CONTENT;
  tokenExpired: string;
  diameter: number;
  strokeWidth: number;
  token: string;

  constructor(
    private router: Router, // private kipService: KipService,
    // private tokenService: TokenService,
    // private languageService: LanguageService,
    // private httpService: HttpService,
    // private translate: TranslateService,
    // private googleAnalyticsService: GoogleAnalyticsService,
    // private cookieService: CookieService,
    // private redirectLoaderService: RedirectLoaderService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.setLanguage();
  }

  ngAfterViewInit(): void {
    // this.directAuth();
    this.resizeLoader();
  }

  private setLanguage(): void {
    // const lang = this.languageService.getLanguageFromLocalStorage();
    // this.translate.use(lang);
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

  // private directAuth(): void {
  //   this.showActionInProgress();
  //   const params = this.redirectLoaderService.redirectQueryParams;
  //   if (params) {
  //     const request = { kip: params.kip, signature: params.signature };
  //     this.httpService.directAuth(request).subscribe(
  //       res => {
  //         this.token = res.token;
  //         this.tokenService.setToken(this.token);
  //         this.search();
  //       },
  //       error => {
  //         this.showActionFailed();
  //       }
  //     );
  //   }
  // }

  // private search(): void {
  //   const searchCriteria = JSON.parse(
  //     JSON.stringify({ kip: this.redirectLoaderService.redirectQueryParams.kip })
  //   );
  //   const contractSearchInfo$ = this.httpService
  //     .getContractSearchInfo(searchCriteria, this.token)
  //     .subscribe(
  //       async res => {
  //         if (res) {
  //           this.successSearch(res);
  //         }
  //       },
  //       ({ error }: HttpErrorResponse) => {
  //         if (error) {
  //           this.failedSuccess(error);
  //         }
  //       }
  //     );

  //   this.subscriptions$.push(contractSearchInfo$);
  // }

  // private successSearch(res: ContractSearchInfo): void {
  //   const { contract, amount, branchName, finalKip, token } = res;
  //   this.webpayWizardService.setContractSearchInfo({
  //     state: ContractInfoEventState.FETCHED,
  //     contractSearchInfo: {
  //       contract,
  //       amount,
  //       branchName,
  //       finalKip,
  //       token,
  //     },
  //   });
  //   this.cookieService.set('webpay-token', res.token);
  //   this.tokenService.setToken(res.token);
  //   this.cookieService.set('kip', JSON.stringify({ kip: finalKip }));
  //   this.kipService.setKipInLocalStorage({ kip: finalKip });
  //   this.kipService.setKip({ kip: finalKip });
  //   this.webpayWizardService.setIsCompleted({
  //     state: StepperEventState.COMPLETE,
  //     position: 0,
  //   });
  //   this.googleAnalyticsService.eventEmitter(
  //     'KHP_VALID',
  //     GoogleAnalytics.SEARCH_CRITERIA,
  //     'KHP_VALID'
  //   );
  //   this.router.navigateByUrl('/');
  // }

  // private failedSuccess(error): void {
  //   this.showActionFailed();
  //   this.googleAnalyticsService.eventEmitter(
  //     'KHP_INVALID',
  //     GoogleAnalytics.SEARCH_CRITERIA,
  //     'KHP_INVALID'
  //   );
  //   this.modalService.openModal(Modal.ERROR_HANDLER, error.error);
  // }

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
