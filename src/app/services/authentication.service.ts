import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authURL = environment.baseUrl + 'int/login';
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.authURL, loginRequest);
  }

  logout(): void {
    localStorage.removeItem('STANDING_ORDERS_TOKEN');
  }

  redirectUserToLogin(): void {
    this.router.navigate(['/login']);
  }

  get token(): string {
    return localStorage.getItem('STANDING_ORDERS_TOKEN');
  }

  set token(value: string) {
    localStorage.setItem('STANDING_ORDERS_TOKEN', value);
  }

  isUserAuthenticated(): boolean {
    return this.token && !this.isTokenInvalid();
  }

  isTokenInvalid(): boolean {
    try {
      return this.jwtHelper.isTokenExpired(this.token);
    } catch (err) {
      this.redirectUserToLogin();
    }
  }
}
