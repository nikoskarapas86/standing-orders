import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';
// import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent
  implements OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked {
  public isVisible = false;

  public insertClicked = true;
  public searchClicked = false;
  public isDisabled = false;
  isLoggedIn$: Observable<boolean>;

  constructor(
    // public userService: UserService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('access_token'));
  }

  ngAfterContentChecked(): void {
    this.isVisible =
      localStorage.getItem('role') != 'read-write' ? false : true;
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {}
  public disappearTable() {
    this.isVisible = false;
  }
  // login
  logout(): void {
    this.router.navigate(['']);
  }
}
