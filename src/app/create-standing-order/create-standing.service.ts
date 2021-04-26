import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaymentType } from '../models/payment-type';
import { SearchPolicyRequest } from '../models/search-policy-request';
import { SearchPolicyResponse } from '../models/search-policy-response';


@Injectable({
  providedIn: 'root'
})
export class CreateStandingService {
  private url = environment.baseUrl;
  constructor(private http: HttpClient) { }

  searchPolicy(searchPolicyRequest: SearchPolicyRequest): Observable<SearchPolicyResponse> {
    return this.http.post<SearchPolicyResponse>(
      `${this.url}/int/search/policy`,
      searchPolicyRequest
    );
  }

  getPaymentTypes(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>(`${this.url}/int/search/paymentTypes`);
  }



}
