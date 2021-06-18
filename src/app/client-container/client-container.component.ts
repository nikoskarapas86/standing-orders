import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreditCardImage } from '../credit-card/enum';
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
    1: {
      name: './assets/images/card_name.png',
      number: './assets/images/card_number.png',
      date: './assets/images/card_date.png',
      code: './assets/images/card_code.png',
    },
    2: '',
  };
  isShowSpinner = false;
  isCreditCard = false;
  branchName: string;
  step = 0;

  constructor(
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver,
    private clientContainerService: ClientContainerService,
    private route: ActivatedRoute,
    private policyDetailService: PolicyDetailService,
    private dataService: DataService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.step === 0) {
      console.log('im here');
      this.route.queryParams.subscribe(params => {
        this.dataService.status = params.status;
        this.dataService
          .getPolicyByEmail(params.searchId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            res => {
              this.step === 1;
              this.changeBackgroundImages();
              this.branchName = res.lineOfBusiness;
              this.policyDetailService.isFailedSubject.next(false);
              // this.policyDetailService.setPolicySubject(res);
              this.policyDetailService.policyResponse = res;
              this.isPolicyLoading = false;
            },
            error => {
              this.policyDetailService.isFailedSubject.next(true);
            }
          );
      });
    }
    this.changeBackgroundImages();
    // console.log(this.policyDetailService.policyResponse.lineOfBusiness);
    this.observeCreditCardBackground();
  }

  private changeBackgroundImages(): void {
    'im here 1';
    this.backgroundImage.forEach(div => {
      const backgroundImage =
        this.step === 0
          ? // ? `./assets/images/SCENE_${this.branchName}.svg`
            this.images[this.step]
          : this.step === 1
          ? this.images[this.step].number
          : '';
      if (this.step === 1) {
        this.renderer.setStyle(
          div.nativeElement,
          'background',
          `#024a86 url(${backgroundImage}) no-repeat center center`
        );
        this.resizeCreditCard(div);
      } else {
        this.renderer.setStyle(
          div.nativeElement,
          'background',
          `#024a86 url(${backgroundImage}) no-repeat center bottom`
        );
        if (backgroundImage.includes('SCENE_EMPTY')) {
          this.renderer.setStyle(div.nativeElement, 'background-size', 'contain');
        } else {
          this.renderer.setStyle(div.nativeElement, 'background-size', 'cover');
          this.renderer.setStyle(div.nativeElement, 'height', 'auto');
        }
      }
    });
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
      // const backgroundImage = this.images[0];
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
