import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PolicyDetailService } from '../policy-details/policy-details.service';
import { ClientContainerService } from '../services/client-container-service';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';

@Component({
  selector: 'app-client-container',
  templateUrl: './client-container.component.html',
  styleUrls: ['./client-container.component.scss'],
})
export class ClientContainerComponent implements OnInit {
  @ViewChildren('backgroundImage') backgroundImage: QueryList<ElementRef>;
  private subscriptions$: Subscription[] = [];
  isPolicyLoading = true;
  private images = {
    0: './assets/images/SCENE_EMPTY.svg',
    1: '',
    2: {
      name: './assets/images/card_name.png',
      number: './assets/images/card_number.png',
      date: './assets/images/card_date.png',
      code: './assets/images/card_code.png',
    },
  };
  isShowSpinner = false;

  constructor(
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver,
    private clientContainerService: ClientContainerService,
    private route: ActivatedRoute,
    private policyDetailService: PolicyDetailService,
    private dataService: DataService,
    private readonly destroy$: DestroyService
 
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.dataService.status = params.status;
      this.dataService
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

  ngAfterViewInit(): void {
    this.observeCreditCardBackground();
  }

  // private getIsShowSpinner(): void {
  //   const isShowLoader$ = this.webpayWizardService.getIsShowSpinner.subscribe(spinnerEvent => {
  //     if (spinnerEvent.state === SpinnerEventState.INITIAL) {
  //       return;
  //     }
  //     this.isShowSpinner = spinnerEvent.isShowSpinnerLoader;
  //     switch (spinnerEvent.status) {
  //       case WebpayPaymentStatus.APPROVED:
  //         this.showActionSucceeded();
  //         break;
  //       case WebpayPaymentStatus.DECLINED:
  //         this.showActionFailed();
  //         break;
  //       case WebpayPaymentStatus.TOKEN_EXPIRED:
  //         this.showTokenExpired(spinnerEvent.message);
  //         break;
  //       default:
  //         this.showActionInProgress();
  //     }
  //   });
  //   this.subscriptions$.push(isShowLoader$);
  // }

  private observeCreditCardBackground(): void {
    const creditCard$ = this.clientContainerService.getCreditCardBackground.subscribe(
      creditCardImage => {
        this.changeCreditCardBackground(creditCardImage);
      }
    );
    this.subscriptions$.push(creditCard$);
  }

  private changeCreditCardBackground(creditCardImage): void {
    this.backgroundImage.forEach(div => {
      const backgroundImage = this.images[2][creditCardImage];
      this.renderer.setStyle(
        div.nativeElement,
        'background',
        `#024a86 url(${backgroundImage}) no-repeat center center`
      );
      this.resizeCreditCard(div);
    });
  }

  private resizeCreditCard(div: ElementRef): void {
    const screenSize$ = this.breakpointObserver
      .observe('(max-width: 768px)')
      .subscribe(({ matches }) => {
        matches
          ? this.renderer.setStyle(div.nativeElement, 'background-size', '277px 160px')
          : this.renderer.setStyle(div.nativeElement, 'background-size', '377px 240px');
      });
    this.subscriptions$.push(screenSize$);
  }
}
