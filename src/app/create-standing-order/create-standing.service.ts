import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateOrderRequest } from '../models/create-order-req';
import { CreateOrderRersponse } from '../models/create-order-response';
import { IbanRequest } from '../models/iban-request';
import { IbanResponse } from '../models/ibanResponse';
import { PaymentType } from '../models/payment-type';
import { SearchPolicyRequest } from '../models/search-policy-request';
import { SearchPolicyResponse } from '../models/search-policy-response';


@Injectable({
  providedIn: 'root'
})
export class CreateStandingService {
  private url = environment.baseUrl;
  constructor(private http: HttpClient) { }

  private createOrderRersponseSubject = new BehaviorSubject<CreateOrderRersponse>(undefined);
  createOrderResponse$: Observable<CreateOrderRersponse> = this.createOrderRersponseSubject.asObservable();
  setCreateOrderSubject(response: CreateOrderRersponse) {
    this.createOrderRersponseSubject.next(response);
  }
  
  sendEmail(email:any,searchId:string){
    return this.http.post(`${this.url}/int/sendEmail/${searchId}`,email)
  }

  searchPolicy(searchPolicyRequest: SearchPolicyRequest): Observable<SearchPolicyResponse> {
    return this.http.post<SearchPolicyResponse>(
      `${this.url}/int/search/policy`,
      searchPolicyRequest
    );
  }
  
  ibanChecker(ibanReq:IbanRequest): Observable<IbanResponse>{
    return this.http.post<IbanResponse>(
      `${this.url}/int/validate/iban `,
      ibanReq
    );
  }

  getPaymentTypes(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>(`${this.url}/int/search/paymentTypes`);
  }

  
  createorder(searchId,createRequest:CreateOrderRequest):Observable<any>{
    return this.http.post(`${this.url}/int/create/bankAccount/${searchId}`,createRequest)
  }

}
