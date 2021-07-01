import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreditCardImage } from '../credit-card/enum';
import { InitialPaymentResponse } from '../models/initial-payment-response';

@Injectable({
  providedIn: 'root',
})
export class ClientContainerService {
  private creditCardBackground = new BehaviorSubject<CreditCardImage>(CreditCardImage.FRONT_NAME);
  getCreditCardBackground = this.creditCardBackground.asObservable();
  private step = new BehaviorSubject<number>(0);
  getStep$ = this.step.asObservable();
  private privateIsPolicyLoading = false;
  isFailedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isFailed$ = this.isFailedSubject.asObservable();
  privateIsPaymentInProgress: boolean;
  private privateInitialPaymentResponse: InitialPaymentResponse;

  policyResponseSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  policyResponse$: Observable<boolean> = this.policyResponseSubject.asObservable();

  setCreditCardBackground(creditCardImage: CreditCardImage): void {
    this.creditCardBackground.next(creditCardImage);
  }

  setStep(step: number): void {
    this.step.next(step);
  }

  set isPolicyLoading(val: boolean) {
    this.privateIsPolicyLoading = val;
  }

  get isPolicyLoading() {
    return this.privateIsPolicyLoading;
  }

  get isPaymentInProgress() {
    return this.privateIsPaymentInProgress;
  }

  set isPaymentInProgress(val: boolean) {
    this.privateIsPaymentInProgress = val;
  }

  get initialPaymentResponse() {
    return this.privateInitialPaymentResponse;
  }

  set initialPaymentResponse(val: InitialPaymentResponse) {
    this.privateInitialPaymentResponse = val;
  }
}
