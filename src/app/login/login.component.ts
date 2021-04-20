import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
// import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { HttpErrorResponse } from '@angular/common/http';

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
    private fb: FormBuilder
  ) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams.redirectTo;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    // this.userService.logout();
  }

  ngOnDestroy(): void {
    if (this.subscriptions$.length > 0) {
      this.subscriptions$.forEach((subscription) => {
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
      (result) => {
        this.loading = false;
        if (result) {
          // this.userService.login(result);
          this.navigateAfterSuccess();
          this.authenticationService.token = result.token;
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

  private navigateAfterSuccess(): void {
    this.router.navigate(['/home']);
    // if (this.redirectUrl) {
    //   this.router.navigateByUrl(this.redirectUrl);
    // } else {
    //   if(this.userService.getCanReadAndWrite()){
    //     this.router.navigate(['insert']);
    //   }else{
    //     this.router.navigate(['search']);
    //   }
    // }
  }

  hasRequiredError(key: string): boolean {
    return (
      this.loginForm.get(key).touched &&
      this.loginForm.get(key).hasError('required')
    );
  }
}
