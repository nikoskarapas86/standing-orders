import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/ligin-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authURL = environment.baseUrl + 'int/login';
  private tokenValue: string;

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(this.authURL, loginRequest);
  }

  get token(): string {
    return this.tokenValue;
  }

  set token(value: string) {
    this.tokenValue = value;
  }
}
