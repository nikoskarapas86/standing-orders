import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetPolicyByEmailResponse } from '../models/get-policy-by-email-response';
@Injectable({
  providedIn: 'root',
})
export class PolicyDetailsService {
  // private url = environment.baseUrl;
  // private httpClient: HttpClient;
  isFailedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isFailed$ = this.isFailedSubject.asObservable();

  private privatePolicyResponse: GetPolicyByEmailResponse;

  constructor() {}

  get policyResponse() {
    return this.privatePolicyResponse;
  }

  set policyResponse(val: GetPolicyByEmailResponse) {
    this.privatePolicyResponse = val;
  }

  // private policyResponseSubject = new BehaviorSubject<GetPolicyByEmailResponse>(undefined);
  // policy$: Observable<GetPolicyByEmailResponse> = this.policyResponseSubject.asObservable();

  // setPolicySubject(response: PolicyResponse) {
  //   this.policyResponseSubject.next(response);
  // }

  // getPolicyByEmail(searchId:string): Observable<PolicyResponse> {
  //   return this.http.get<PolicyResponse>(`${this.url}/int/policy/${searchId}`);
  // }
}
