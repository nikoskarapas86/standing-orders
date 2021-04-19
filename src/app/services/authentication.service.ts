import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginRequest } from '../models/login-request';
import { AuthResponse } from '../models/auth-response';

@Injectable()
export class AuthenticationService {
  private authURL: string = 'int/login';

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest) {
    return this.http.post<AuthResponse>(this.authURL, loginRequest);
  }
}
