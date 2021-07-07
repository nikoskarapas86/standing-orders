import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  public errorMsg = '';
  redirectUrl: string;
  hide = true;
  loginForm: FormGroup;
  private subscriptions$: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    // private userService: UserService,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams.redirectTo;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.authenticationService.logout();
    this.resetSearch();
  }

  ngOnDestroy(): void {
    if (this.subscriptions$.length > 0) {
      this.subscriptions$.forEach(subscription => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    }
  }

  login(): void {
    const credentials = new LoginRequest();
    credentials.username = this.loginForm.get('username').value;
    credentials.password = this.loginForm.get('password').value;
    const login$ = this.authenticationService.login(credentials).subscribe(
      (result: any) => {
        this.loading = false;
        if (result) {
          this.authenticationService.token = result.token;
          this.authenticationService.username = result.fullName;
          this.navigateAfterSuccess();
        }
      },
      (error: HttpErrorResponse) => {
        if (error !== undefined && error != null) {
          this.errorMsg = error.error.message;
        }
        this.loading = false;
      }
    );
    this.subscriptions$.push(login$);
  }

  resetSearch(): void {
    this.dataService.searchRequest = undefined;
    this.dataService.searchForm = undefined;
  }

  private navigateAfterSuccess(): void {
    this.router.navigate(['/home']);
  }

  hasRequiredError(key: string): boolean {
    return this.loginForm.get(key).touched && this.loginForm.get(key).hasError('required');
  }
}
