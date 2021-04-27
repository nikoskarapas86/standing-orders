
import { DOCUMENT } from '@angular/common';
import { Component, Inject,  OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Input } from 'src/app/models/input';
import { Colors, HostedFieldsIds, HostedFieldsSelectors, HostedSessionCallbacks, HostedSessionPaymentType, HostedSessionStatus, MastercardEnum } from 'src/app/credit-card/enum';
import { InitPaymentResponse } from 'src/app/models/init-payment-response';
import { LabelInput } from 'src/app/models/label-input';
import { MastercardService } from 'src/app/services/mastercard.service';
import { WindowRefService } from 'src/app/services/window-ref.service';

@Component({
  selector: 'app-search-credit-card',
  templateUrl: './search-credit-card.component.html',
  styleUrls: ['./search-credit-card.component.scss']
})
export class SearchCreditCardComponent implements OnInit {
  mastercard: InitPaymentResponse;
  private paymentSession: Window;
  @Inject('windowObject') window: Window;

  private cardNumber: LabelInput = new LabelInput();
  private name: LabelInput = new LabelInput();
  private year: Input = new Input();
  private month: Input = new Input();

  private hostedFieldsSelectors = [
    HostedFieldsSelectors.NUMBER,
    HostedFieldsSelectors.NAME_ON_CARD,
    HostedFieldsSelectors.EXPIRY_MONTH,
    HostedFieldsSelectors.EXPIRY_YEAR,
  ];

  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: { value: number; viewValue: number }[] = [];
  private activeFieldValidated = null;

  isLoading = false;
  isPaymentCompleted = false;
  isNextPushed = false;
  hasInstallments: boolean;
  isNameOnCard: boolean;
  private subscriptions$: Subscription[] = [];

  constructor(
    private mastercardService: MastercardService,
    @Inject(DOCUMENT) private document: Document,
    private windowRefService: WindowRefService 
  ) {}

  ngOnInit(): void {
    this.setYears();

    this.mastercard = this.mastercardService.initPaymentResponse;
    this.initMastercardSetUp();
  }

  ngAfterViewInit(): void {
    // this.removeAntiClickJacking();
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
      script.src = `https://ibanke-commerce.nbg.gr/form/version/57/merchant/${this.mastercard.merchantId}/session.js`; // prod
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
        // initialized: response => {
        // initialized( ): invoked when the hosted fields attach to your payment page.
        // },
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
          break;
        case HostedFieldsIds.NAME_ON_CARD:
          this.name.input.placeholder = '';
          this.name.label.style.visibility = 'visible';
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

  private handleResponseUpdateSession(response): void {
    if (!response?.status) {
      // TODO: handle error
      return;
    }
    response.status === HostedSessionStatus.OK
      ? this.handleOKStatus(response)
      : this.handleFieldsInErrorStatus(response);
  }

  private handleOKStatus(response): void {
    this.isNameOnCard = response.sourceOfFunds.provided.card.nameOnCard !== undefined;
    this.name.input.style.borderColor = !this.isNameOnCard ? Colors.redInvalid : Colors.blackValid;

    if (this.hasInstallments === undefined && this.isNameOnCard && this.isNextPushed) {
      const cardNumber = response.sourceOfFunds.provided.card.number;
      this.getHasInstallments(cardNumber);
    }
  }

  private getHasInstallments = (cardNumber: string): void => {
    this.isLoading = true;
    const payments$ = this.mastercardService
      .getHasInstallments({
        cardNumber,
      })
      .subscribe(
        ({ hasInstallments }) => {
          this.hasInstallments = hasInstallments;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    this.subscriptions$.push(payments$);
  };

  private handleFieldsInErrorStatus(response): void {
    this.cardNumber.input.style.borderColor = this.getBorderColor(response, 'cardNumber', 'NUMBER');
    this.year.input.style.borderColor = this.getBorderColor(response, 'expiryYear', 'EXPIRY_YEAR');
    this.month.input.style.borderColor = this.getBorderColor(
      response,
      'expiryMonth',
      'EXPIRY_YEAR'
    );
    this.name.input.style.borderColor = this.getBorderColor(response, 'name', 'NAME_ON_CARD');

    this.isPaymentCompleted = false;
    this.isNextPushed = false;
  }

  private getBorderColor = (response, formField: string, fieldId: string) =>
    response.errors[formField] === HostedSessionStatus.INVALID ||
    (response.errors[formField] === HostedSessionStatus.MISSING &&
      this.activeFieldValidated === HostedFieldsIds[fieldId])
      ? Colors.redInvalid
      : Colors.blackValid;
      next() {
        this.isNextPushed = true;
        // invokes PaymentSession.updateSessionFromForm('card') on setPaymentSessionConfig()
        this.paymentSession[HostedSessionCallbacks.updateSessionFromForm](
          HostedSessionPaymentType.CARD
        );
      }


      pay(): void {
        this.isLoading = true;
        if (!this.isNameOnCard) return;
    
        this.paymentSession[HostedSessionCallbacks.updateSessionFromForm](
          HostedSessionPaymentType.CARD
        );
        const installments = this.getInstallments();
        this.mastercardService.pay({ installments }).subscribe(
          res => {
            this.isPaymentCompleted = true;
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
          }
        );
      }
    
      private getInstallments(): string {
        const installments = this.document.getElementById('installment-number') as HTMLInputElement;
        if (installments) return installments.value || '0';
    
        return '0';
      }
    
      cancel(): void {
        this.mastercardService.isMastercardVisible = false;
        this.mastercardService.hasSearched = false;
      }
    
      // APPLY CLICK-JACKING STYLING AND HIDE CONTENTS OF THE PAGE
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
