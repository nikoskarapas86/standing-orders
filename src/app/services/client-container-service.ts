import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreditCardImage } from '../credit-card/enum';

@Injectable({
  providedIn: 'root',
})
export class ClientContainerService {
  private creditCardBackground = new BehaviorSubject<CreditCardImage>(CreditCardImage.FRONT_NAME);
  getCreditCardBackground = this.creditCardBackground.asObservable();
  private step = new BehaviorSubject<number>(0);
  getStep$ = this.step.asObservable();
  private privateIsPolicyLoading = true;
  isFailedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isFailed$ = this.isFailedSubject.asObservable();

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
}
