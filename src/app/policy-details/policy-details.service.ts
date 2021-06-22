import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PolicyResponse } from '../models/policy-response';
@Injectable({
  providedIn: 'root',
})
export class PolicyDetailsService {
  // private url = environment.baseUrl;
  // private httpClient: HttpClient;
  isFailedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isFailed$ = this.isFailedSubject.asObservable();

  private privatePolicyResponse: PolicyResponse;

  constructor() {}

  get policyResponse() {
    return this.privatePolicyResponse;
  }

  set policyResponse(val: PolicyResponse) {
    this.privatePolicyResponse = val;
  }

  private policyResponseSubject = new BehaviorSubject<PolicyResponse>(undefined);
  policy$: Observable<PolicyResponse> = this.policyResponseSubject.asObservable();

  // setPolicySubject(response: PolicyResponse) {
  //   this.policyResponseSubject.next(response);
  // }

  // getPolicyByEmail(searchId:string): Observable<PolicyResponse> {
  //   return this.http.get<PolicyResponse>(`${this.url}/int/policy/${searchId}`);
  // }
}
