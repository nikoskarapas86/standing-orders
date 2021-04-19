import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private canRead: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private canReadAndWrite: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedInSubject.asObservable().pipe(
    tap(isLoggedIn => {
      if (!isLoggedIn) this.redirectUserToLogin();
    })
  );

  redirectUserToLogin() {
    this.router.navigate(['/login']);
  }

  constructor(private router: Router) {
    this.setToken(localStorage.getItem('access_token'));
  }

  login(auth: any) {
    this.setToken(auth.accessToken);
    localStorage.setItem('role', auth.role);
  }

  isUserAuthenticated():boolean {
    return !!this.getToken();
  }

  setToken(token: string) {
    if (!token) {
      localStorage.removeItem('access_token');
    } else {
      localStorage.setItem('access_token', token);
    }

    this.tokenSubject.next(token);
    this.loggedInSubject.next(this.isUserAuthenticated());
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.loggedInSubject.next(undefined);
  }

 
}
