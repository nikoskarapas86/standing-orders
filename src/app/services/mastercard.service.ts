import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateSessionResponse } from '../models/create-session-response';
import { InitialPaymentResponse } from '../models/initial-payment-response';
import { PayRequest } from '../models/pay-request';
import { PayResponse } from '../models/pay-response';
import { TokenizeRequest } from '../models/tokenize-request';
import { TokenizeResponse } from '../models/tokenize-response';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class MastercardService {
  private url = environment.baseUrl;
  private policyDetailsToken: string;

  constructor(private httpClient: HttpClient, private dataService: DataService) {}

  setPolicyDetailsToken = (policyDetailsToken: string): void => {
    this.policyDetailsToken = policyDetailsToken;
  };

  createSession(searchId: string): Observable<CreateSessionResponse> {
    const update = this.dataService.status === 'create' ? '' : '/update';
    return this.httpClient.get<CreateSessionResponse>(
      `${this.url}/int${update}/create/session/${searchId}`
    );
  }

  tokenize(searchId: string, request: TokenizeRequest): Observable<TokenizeResponse> {
    const update = this.dataService.status === 'create' ? '' : '/update';
    return this.httpClient.post<TokenizeResponse>(
      `${this.url}/int${update}/tokenize/${searchId}`,
      request
    );
  }

  initialPayment(searchId: string): Observable<InitialPaymentResponse> {
    const update = this.dataService.status === 'create' ? '' : '/update';
    return this.httpClient.post<InitialPaymentResponse>(
      `${this.url}/int${update}/initialPayment/${searchId}`,
      null
    );
  }

  // pay = (request: PayRequest): Observable<PayResponse> => {
  //   const update = this.dataService.status === 'create' ? '' : '/update';
  //   return this.httpClient.post<PayResponse>('posweb/payment/pay', request, {
  //     headers: { PolicyDetails: this.policyDetailsToken },
  //   });
  // };
}
