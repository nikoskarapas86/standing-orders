import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreditCardImage } from '../credit-card/enum';

@Injectable({
  providedIn: 'root',
})
export class ClientContainerService {
  private creditCardBackground = new BehaviorSubject<CreditCardImage>(CreditCardImage.FRONT_NAME);
  getCreditCardBackground = this.creditCardBackground.asObservable();

  setCreditCardBackground(creditCardImage: CreditCardImage): void {
    this.creditCardBackground.next(creditCardImage);
  }
}
