import { Component, ChangeDetectorRef, AfterContentChecked, AfterViewChecked, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, AfterViewChecked, AfterContentChecked {
  public isVisible = false;
  public insertClicked = true;
  public searchClicked = false;
  public isDisabled = false;
  public environment = '';
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private dataService: DataService
  ) { }
  ngOnInit() {
    this.environment = environment.environment;
  }
  ngAfterContentChecked(): void {
    this.isVisible = localStorage.getItem('role') !== 'read-write' ? false : true;
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  navigateToHome() {
    this.dataService.searchForm = undefined;
    this.dataService.searchRequest = undefined;
    this.router.navigate(['/home']);
  }

  logout(): void {

    this.dataService.logout().subscribe(
      (res) => {
        this.authenticationService.logout();
        this.dataService.setLineOfbusinessesSubject(undefined);
        this.router.navigate(['']);
      },
      error => {
        this.matDialog.open(ModalComponent, { data: error });
      }
    )



  }
}
