import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Colors,
  CreditCardImage,
  HostedFieldsIds,
  HostedFieldsSelectors,
  HostedSessionCallbacks,
  HostedSessionPaymentType,
  HostedSessionStatus,
  MastercardEnum,
} from './enum';
import { Input } from '../models/input';
import { LabelInput } from '../models/label-input';
import { MastercardService } from '../services/mastercard.service';
import { WindowRefService } from '../services/window-ref.service';
import { CreateSessionResponse } from '../models/create-session-response';
import { ActivatedRoute } from '@angular/router';
import { TokenizeRequest } from '../models/tokenize-request';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientContainerService } from '../services/client-container-service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit, OnDestroy {
  mastercard: CreateSessionResponse;
  private paymentSession: Window;
  @Inject('windowObject') window: Window;

  private cardNumber: LabelInput = new LabelInput();
  private name: LabelInput = new LabelInput();
  private securityCode: LabelInput = new LabelInput();
  private year: Input = new Input();
  private month: Input = new Input();

  private searchId: string;

  private hostedFieldsSelectors = [
    HostedFieldsSelectors.NUMBER,
    HostedFieldsSelectors.NAME_ON_CARD,
    HostedFieldsSelectors.EXPIRY_MONTH,
    HostedFieldsSelectors.EXPIRY_YEAR,
    HostedFieldsSelectors.SECURITY_CODE,
  ];

  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: { value: number; viewValue: number }[] = [];
  private activeFieldValidated = null;

  isLoading = false;
  isPaymentCompleted = false;
  isPayPushed = false;
  isFailed = false;

  isNameOnCard: boolean;
  isCvv: boolean;

  private subscriptions$: Subscription[] = [];

  constructor(
    private mastercardService: MastercardService,
    @Inject(DOCUMENT) private document: Document,
    private windowRefService: WindowRefService,
    private route: ActivatedRoute,
    private clientContainerService: ClientContainerService,
   private dataService:DataService
  ) {}

  ngOnInit(): void {
    console.log(this.dataService.status )
    this.setYears();
    this.applyAntiClickJacking();
    this.searchId = this.route.snapshot.params.searchId;

    this.mastercardService.createSession(this.searchId).subscribe(mastercard => {
      this.mastercard = mastercard;
      this.initMastercardSetUp();
    });
  }

  ngAfterViewInit(): void {
    this.removeAntiClickJacking();
    this.setInputsForHostedFields();
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

  private setInputsForHostedFields(): void {
    this.setInputLabel(this.cardNumber, '#card-number-label', 'NUMBER');
    this.setInputLabel(this.name, '#cardholder-name-label', 'NAME_ON_CARD');
    this.setInputLabel(this.securityCode, '#security-code-label', 'SECURITY_CODE');

    this.year.input = this.document.querySelector(HostedFieldsIds.EXPIRY_YEAR) as HTMLInputElement;
    this.month.input = this.document.querySelector(
      HostedFieldsIds.EXPIRY_MONTH
    ) as HTMLInputElement;
  }

  private setInputLabel = (inputLabel: LabelInput, id: string, hostedId: string): void => {
    inputLabel.label = this.document.querySelector(id) as HTMLInputElement;
    inputLabel.label.style.visibility = 'hidden';
    inputLabel.input = this.document.querySelector(HostedFieldsIds[hostedId]) as HTMLInputElement;
  };

  private setYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 20; year++) {
      const yearFormatted = Number(year.toString().slice(-2));
      this.years.push({ value: yearFormatted, viewValue: year });
    }
  }

  private initMastercardSetUp(): void {
    if (this.mastercard) {
      const head = this.document.getElementsByTagName('head')[0];
      const script = this.document.createElement('script');
      script.id = 'mastercard-hosted-session';
      script.src = `https://ibanke-commerce.nbg.gr/form/version/57/merchant/${this.mastercard.merchant}/session.js`; // prod
      script.type = 'text/javascript';
      head.appendChild(script);
      script.onload = () => this.configureHostedSession();
    }
  }

  private configureHostedSession(): void {
    /*
      PaymentSession instance is retrieved from Global Object(window) after injecting script
      https://ibanke-commerce.nbg.gr/form/version/57/merchant/TEST7000006/session.js into head tag
     */
    this.paymentSession = this.windowRefService.nativeWindow()['PaymentSession'];
    this.setPaymentSessionConfig();
    this.setPaymentSessionOnFocus();
    this.setPaymentSessionOnBlur();
    this.setPaymentSessionHoverStyle();
  }

  private setPaymentSessionConfig(): void {
    const configure = {
      session: this.mastercard.sessionID,
      fields: {
        card: {
          // Attach hosted fields to your payment page
          number: HostedFieldsIds.NUMBER,
          expiryMonth: HostedFieldsIds.EXPIRY_MONTH,
          expiryYear: HostedFieldsIds.EXPIRY_YEAR,
          nameOnCard: HostedFieldsIds.NAME_ON_CARD,
          securityCode: HostedFieldsIds.SECURITY_CODE,
        },
      },
      locale: 'el',
      frameEmbeddingMitigation: ['javascript'],
      interaction: {
        displayControl: {
          formatCard: 'EMBOSSED',
          invalidFieldCharacters: 'REJECT',
        },
      },
      callbacks: {
        formSessionUpdate:
          // invoked in response to the PaymentSession.updateSessionFromForm('card')
          response => this.handleResponseUpdateSession(response),
      },
    };
    this.paymentSession[HostedSessionCallbacks.configure](configure);
  }

  private setPaymentSessionOnFocus(): void {
    this.paymentSession[HostedSessionCallbacks.onFocus](this.hostedFieldsSelectors, selector => {
      switch (selector) {
        case HostedFieldsIds.NUMBER:
          this.cardNumber.input.placeholder = '';
          this.cardNumber.label.style.visibility = 'visible';
          this.clientContainerService.setCreditCardBackground(CreditCardImage.FRONT_NUMBER);
          break;
        case HostedFieldsIds.NAME_ON_CARD:
          this.name.input.placeholder = '';
          this.name.label.style.visibility = 'visible';
          this.clientContainerService.setCreditCardBackground(CreditCardImage.FRONT_NAME);
          break;
        case HostedFieldsIds.EXPIRY_MONTH:
          this.clientContainerService.setCreditCardBackground(CreditCardImage.FRONT_DATE);
          break;
        case HostedFieldsIds.EXPIRY_YEAR:
          this.clientContainerService.setCreditCardBackground(CreditCardImage.FRONT_DATE);
          break;
        case HostedFieldsIds.SECURITY_CODE:
          this.securityCode.input.placeholder = '';
          this.securityCode.label.style.visibility = 'visible';
          this.clientContainerService.setCreditCardBackground(CreditCardImage.BACK);
          break;
      }
    });
  }

  private setPaymentSessionOnBlur(): void {
    this.paymentSession[HostedSessionCallbacks.onBlur](this.hostedFieldsSelectors, selector => {
      this.activeFieldValidated = selector;
      switch (selector) {
        case HostedFieldsIds.NUMBER:
          this.cardNumber.input.placeholder = MastercardEnum.cardNumber;
          this.cardNumber.label.style.visibility = 'hidden';
          break;
        case HostedFieldsIds.NAME_ON_CARD:
          this.name.input.placeholder = MastercardEnum.cardHolderName;
          this.name.label.style.visibility = 'hidden';
          break;
        case HostedFieldsIds.SECURITY_CODE:
          this.securityCode.input.placeholder = MastercardEnum.cvv;
          this.securityCode.label.style.visibility = 'hidden';
          break;
      }
      // invokes PaymentSession.updateSessionFromForm('card') on setPaymentSessionConfig()
      this.paymentSession[HostedSessionCallbacks.updateSessionFromForm](
        HostedSessionPaymentType.CARD
      );
    });
  }

  private setPaymentSessionHoverStyle(): void {
    this.paymentSession[HostedSessionCallbacks.setHoverStyle](this.hostedFieldsSelectors, {
      borderColor: Colors.blueHoverColor,
      borderWidth: '2px',
    });
  }

  // invoked in response to the PaymentSession.updateSessionFromForm('card') on setPaymentSessionConfig()
  private handleResponseUpdateSession(response): void {
    if (!response?.status) {
      // TODO: handle error
      return;
    }
    response.status === HostedSessionStatus.OK
      ? this.handleOKStatus(response)
      : this.handleFieldsInErrorStatus(response);
  }

  private getBrowser() {
    const browsersMapping = {
      Opera: 'Opera',
      OPR: 'Opera',
      Chrome: 'Chrome',
      Safari: 'Safari',
      Firefox: 'Firefox',
      MSIE: 'IE',
    };
    const foundBrowser = Object.entries(browsersMapping).find(
      b => navigator.userAgent.indexOf(b[0]) !== -1
    );

    if (foundBrowser) {
      return foundBrowser[1];
    }
    if (!!this.document['documentMode']) {
      return 'IE';
    }
    return 'unknown';
  }

  private getTokenizeRequest(): TokenizeRequest {
    const d = new Date();
    const timeZone = d.getTimezoneOffset();

    return {
      browser: this.getBrowser(),
      browserDetails: {
        '3DSecureChallengeWindowSize': 'FULL_SCREEN',
        acceptHeaders: 'application/json',
        colorDepth: screen.colorDepth,
        // TODO: check javaEnabled
        javaEnabled: navigator.javaEnabled(),
        // javaEnabled: true,
        language: 'en-US',
        screenHeight: screen.height,
        screenWidth: screen.width,
        timeZone,
      },
    };
  }

  private handleOKStatus(response): void {
    this.isNameOnCard = response.sourceOfFunds.provided.card.nameOnCard !== undefined;
    this.isCvv = response.sourceOfFunds.provided.card.securityCode !== undefined;
    this.name.input.style.borderColor = !this.isNameOnCard ? Colors.redInvalid : Colors.blackValid;
    this.securityCode.input.style.borderColor = !this.securityCode
      ? Colors.redInvalid
      : Colors.blackValid;
  }

  private handleFieldsInErrorStatus(response): void {
    this.cardNumber.input.style.borderColor = this.getBorderColor(response, 'cardNumber', 'NUMBER');
    this.year.input.style.borderColor = this.getBorderColor(response, 'expiryYear', 'EXPIRY_YEAR');
    this.month.input.style.borderColor = this.getBorderColor(
      response,
      'expiryMonth',
      'EXPIRY_YEAR'
    );
    this.name.input.style.borderColor = this.getBorderColor(response, 'name', 'NAME_ON_CARD');
    this.securityCode.input.style.borderColor = this.getBorderColor(
      response,
      'securityCode',
      'SECURITY_CODE'
    );

    this.isPaymentCompleted = false;
    this.isPayPushed = false;
  }

  private getBorderColor(response, formField: string, fieldId: string): string {
    return response.errors[formField] === HostedSessionStatus.INVALID ||
      (response.errors[formField] === HostedSessionStatus.MISSING &&
        this.activeFieldValidated !== HostedFieldsIds[fieldId])
      ? Colors.redInvalid
      : Colors.blackValid;
  }

  next() {
    this.paymentSession[HostedSessionCallbacks.updateSessionFromForm](
      HostedSessionPaymentType.CARD
    );
  }

  tokenize(): void {
    if (!this.isNameOnCard || !this.isCvv) return;
    // TODO: check if isPaymentInProgress and isLoading flags are necessary
    this.clientContainerService.isPaymentInProgress = true;
    this.isPayPushed = true;
    this.isLoading = true;

    this.paymentSession[HostedSessionCallbacks.updateSessionFromForm](
      HostedSessionPaymentType.CARD
    );

    const request = this.getTokenizeRequest();
    this.mastercardService.tokenize(this.searchId, request).subscribe(
      ({ html }) => {
        // this.isLoading = false;
        this.clientContainerService.isFailedSubject.next(false);
        this.clientContainerService.isPaymentInProgress = false;
        html ? this.redirectToMastercard3ds(html) : this.initialPayment();
      },
      (error: HttpErrorResponse) => {
        this.failed();
      }
    );

    this.isPayPushed = false;
  }

  private initialPayment(): void {
    console.log(status)
    this.mastercardService.initialPayment(this.searchId, this.dataService.status).subscribe(
      res => {
        this.isPaymentCompleted = true;
        this.isLoading = false;
      },
      error => {
        this.failed();
      }
    );
  }

  private failed(): void {
    this.isLoading = false;
    this.isFailed = true;
    this.clientContainerService.isFailedSubject.next(true);
  }

  private redirectToMastercard3ds(htmlBody) {
    const div = this.document.createElement('div');
    div.innerHTML = htmlBody;
    div.style.visibility = 'hidden';
    this.document.body.insertAdjacentHTML('beforeend', htmlBody);
    const scriptContent: any = this.document.getElementById('authenticate-payer-script');
    eval(scriptContent.text);
  }

  // APPLY CLICK-JACKING STYLING AND HIDE CONTENTS OF THE PAGE
  // https://test-gateway.mastercard.com/api/documentation/integrationGuidelines/hostedSession/integrationModelHostedSession.html
  private applyAntiClickJacking(): void {
    const head = this.document.getElementsByTagName('head')[0];
    const style = this.document.createElement('style');
    style.id = 'antiClickjack';
    style.innerHTML = `
      body {
        display: none !important;
      }
    `;
    head.appendChild(style);
  }

  private removeAntiClickJacking(): void {
    if (self === top) {
      const antiClickjack = this.document.getElementById('antiClickjack');
      antiClickjack.parentNode.removeChild(antiClickjack);
    } else {
      top.location = self.location;
    }
  }
}
