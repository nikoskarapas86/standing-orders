import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateSessionResponse } from '../models/create-session-response';
import { GetHasInstallmentsRequest } from '../models/get-has-installments-request';
import { HasInstallments } from '../models/has-installments';
// import { InitPaymentRequest } from '../models/init-payment-request';
import { InitPaymentResponse } from '../models/init-payment-response';
import { PayRequest } from '../models/pay-request';
import { PayResponse } from '../models/pay-response';
import { TokenizeRequest } from '../models/tokenize-request';

@Injectable({
  providedIn: 'root',
})
export class MastercardService {
  private url = environment.baseUrl;

  private policyDetailsToken: string;
  // private _initPaymentResponse: InitPaymentResponse;
  private _isMastercardVisible: boolean;

  private _hasSearched = new BehaviorSubject<boolean>(false);
  getHasSearched = this._hasSearched.asObservable();

  constructor(private httpClient: HttpClient) {}

  setPolicyDetailsToken = (policyDetailsToken: string): void => {
    this.policyDetailsToken = policyDetailsToken;
  };

  // setInitPaymentResponse = (initPaymentResponse: InitPaymentResponse): void => {
  //   this._initPaymentResponse = initPaymentResponse;
  // };

  // get initPaymentResponse(): InitPaymentResponse {
  //   return this._initPaymentResponse;
  // }

  // initPayment = (request: InitPaymentRequest): Observable<InitPaymentResponse> => {
  //   return this.httpClient.post<InitPaymentResponse>('posweb/payment/initPayment', request, {
  //     headers: { PolicyDetails: this.policyDetailsToken },
  //   });
  // };

  createSession(searchId: string): Observable<CreateSessionResponse> {
    return this.httpClient.get<CreateSessionResponse>(`${this.url}/int/create/session/${searchId}`);
  }

  tokenize(searchId: string, request: TokenizeRequest): Observable<CreateSessionResponse> {
    return this.httpClient.post<CreateSessionResponse>(
      `${this.url}/int/tokenize/${searchId}`,
      request
    );
  }

  initialPayment(searchId: string): Observable<CreateSessionResponse> {
    return this.httpClient.post<CreateSessionResponse>(
      `${this.url}/int/initialPayment/${searchId}`,
      null
    );
  }

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
