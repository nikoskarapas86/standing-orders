import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchPolicyResponse } from 'src/app/models/search-policy-response';
import { ModalComponent } from 'src/app/modal/modal.component';
import { CreateStandingService } from '../create-standing.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  emailForm: FormGroup
  searchId: string
  _isEmailDisabled: boolean = false;

  set isEmailDisabled(val: boolean) {
    this._isEmailDisabled = val
  }

  get isEmailDisabled() {
    return this._isEmailDisabled;
  }
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private createStandingService: CreateStandingService,
    public dialog: MatDialog) {
    this.emailFormGroup()
  }

  ngOnInit(): void {

    this.dataService.searchPolicyResponse$.subscribe((res: SearchPolicyResponse) => {
      if (!res) this.navigateBack()
      this.emailForm.controls['email'].setValue(res.email)
      this.searchId = res.searchId
    },
      error => {
        this.dialog.open(ModalComponent, { data: error });
      }
    )
  }



  navigateBack() {
    this.router.navigate(['/home']);
  }

  sendEmail() {
    this.isEmailDisabled = true;
    this.createStandingService.sendEmail({ "email": this.emailForm.get('email').value }, this.searchId).subscribe(
      (res: any) => {
        this.dialog.open(ModalComponent, { data: res.message }).afterClosed().subscribe(() => {
          this.router.navigate(['/home'])  
        });
      },
      error => {
        this.dialog.open(ModalComponent, { data: error });
        this.isEmailDisabled = false;
      } 
    )
  }

  emailFormGroup() {
    this.emailForm = this.formBuilder.group({
      email: ''
    })
  }

  back() {
    this.router.navigate(['create/payment-way'])
  }

}
