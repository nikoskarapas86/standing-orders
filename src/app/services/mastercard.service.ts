import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateSessionResponse } from '../models/create-session-response';
import { PayRequest } from '../models/pay-request';
import { PayResponse } from '../models/pay-response';
import { TokenizeRequest } from '../models/tokenize-request';
import { TokenizeResponse } from '../models/tokenize-response';

@Injectable({
  providedIn: 'root',
})
export class MastercardService {
  private url = environment.baseUrl;
  private policyDetailsToken: string;

  constructor(private httpClient: HttpClient) {}

  setPolicyDetailsToken = (policyDetailsToken: string): void => {
    this.policyDetailsToken = policyDetailsToken;
  };

  createSession(searchId: string): Observable<CreateSessionResponse> {
    return this.httpClient.get<CreateSessionResponse>(`${this.url}/int/create/session/${searchId}`);
  }

  tokenize(searchId: string, request: TokenizeRequest): Observable<TokenizeResponse> {
    return this.httpClient.post<TokenizeResponse>(`${this.url}/int/tokenize/${searchId}`, request);
  }

  initialPayment(searchId: string): Observable<CreateSessionResponse> {
    return this.httpClient.post<CreateSessionResponse>(
      `${this.url}/int/initialPayment/${searchId}`,
      null
    );
  }

  pay = (request: PayRequest): Observable<PayResponse> => {
    return this.httpClient.post<PayResponse>('posweb/payment/pay', request, {
      headers: { PolicyDetails: this.policyDetailsToken },
    });
  };
}
