
import { HttpClient,HttpBackend  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PolicyResponse } from '../models/policy-response';
@Injectable({
    providedIn: 'root',
  })
  export class PolicyDetailService {
    private url = environment.baseUrl;
    private httpClient: HttpClient;

    constructor(handler: HttpBackend) {
        this.httpClient = new HttpClient(handler);
    }
    
    getPolicyByEmail(searchId:string): Observable<PolicyResponse> {
        return this.httpClient.get<PolicyResponse>(`${this.url}/int/policy/${searchId}`);
      }

  }