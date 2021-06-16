import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PolicyResponse } from '../models/policy-response';
@Injectable({
  providedIn: 'root',
})
export class PolicyDetailService {
  // private url = environment.baseUrl;
  // private httpClient: HttpClient;
  isFailedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isFailed$ = this.isFailedSubject.asObservable();

    constructor(handler: HttpBackend) {
        // this.httpClient = new HttpClient(handler);
    }

    private policyResponseSubject = new BehaviorSubject<PolicyResponse>(undefined);
    
    policy$ : Observable<PolicyResponse> = this.policyResponseSubject.asObservable();
    
    setPolicySubject(response: PolicyResponse) {
      this.policyResponseSubject.next(response);
    }

    // getPolicyByEmail(searchId:string): Observable<PolicyResponse> {
    //   return this.http.get<PolicyResponse>(`${this.url}/int/policy/${searchId}`);
    // }
}
