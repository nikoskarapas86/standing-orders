import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetHasInstallmentsRequest } from '../models/get-has-installments-request';
import { HasInstallments } from '../models/has-installments';
import { InitPaymentRequest } from '../models/init-payment-request';
import { InitPaymentResponse } from '../models/init-payment-response';
import { PayRequest } from '../models/pay-request';
import { PayResponse } from '../models/pay-response';

@Injectable({
  providedIn: 'root',
})
export class MastercardService {
  private policyDetailsToken: string;
  private _initPaymentResponse: InitPaymentResponse;
  private _isMastercardVisible: boolean;

  private _hasSearched = new BehaviorSubject<boolean>(false);
  getHasSearched = this._hasSearched.asObservable();

  constructor(private httpClient: HttpClient) {}

  setPolicyDetailsToken = (policyDetailsToken: string): void => {
    this.policyDetailsToken = policyDetailsToken;
  };

  setInitPaymentResponse = (initPaymentResponse: InitPaymentResponse): void => {
    this._initPaymentResponse = initPaymentResponse;
  };

  get initPaymentResponse(): InitPaymentResponse {
    return this._initPaymentResponse;
  }

  initPayment = (request: InitPaymentRequest): Observable<InitPaymentResponse> => {
    return this.httpClient.post<InitPaymentResponse>('posweb/payment/initPayment', request, {
      headers: { PolicyDetails: this.policyDetailsToken },
    });
  };

  getHasInstallments(request: GetHasInstallmentsRequest): Observable<HasInstallments> {
    return this.httpClient.post<HasInstallments>('posweb/payment/supportInstallments', request);
  }

  pay = (request: PayRequest): Observable<PayResponse> => {
    return this.httpClient.post<PayResponse>('posweb/payment/pay', request, {
      headers: { PolicyDetails: this.policyDetailsToken },
    });
  };

  set isMastercardVisible(val: boolean) {
    this._isMastercardVisible = val;
  }

  get isMastercardVisible(): boolean {
    return this._isMastercardVisible;
  }

  set hasSearched(val: boolean) {
    this._hasSearched.next(val);
  }
}
