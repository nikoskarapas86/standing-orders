import {
  Component,
  ChangeDetectorRef,
  AfterContentChecked,
  AfterViewChecked,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements AfterViewChecked, AfterContentChecked {
  public isVisible = false;
  public insertClicked = true;
  public searchClicked = false;
  public isDisabled = false;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterContentChecked(): void {
    this.isVisible =
      localStorage.getItem('role') !== 'read-write' ? false : true;
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  logout(): void {
    this.router.navigate(['']);
    this.authenticationService.logout();
  }
}
