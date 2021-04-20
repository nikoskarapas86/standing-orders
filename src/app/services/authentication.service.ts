import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authURL = environment.baseUrl + 'int/login';

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(this.authURL, loginRequest);
  }

  logout(): void {
    localStorage.removeItem('STANDING_ORDERS_TOKEN');
  }

  get token(): string {
    return localStorage.getItem('STANDING_ORDERS_TOKEN');
  }

  set token(value: string) {
    localStorage.setItem('STANDING_ORDERS_TOKEN', value);
  }
}
