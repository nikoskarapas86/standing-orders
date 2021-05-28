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
  searchId:string
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private createStandingService:CreateStandingService,
    public dialog: MatDialog) {
      this.emailFormGroup()
     }

  ngOnInit(): void {
 
    this.dataService.searchPolicyResponse$.subscribe((res: SearchPolicyResponse) => {
     if(!res) this.navigateBack()
     console.log(res) 
     console.log( this.emailForm.controls)
      this.emailForm.controls['email'].setValue(res.email)
      // console.log(this.emailForm.get('email').value) 
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
    console.log(this.emailForm.get('email').value)
    console.log(this.searchId)
  this.createStandingService.sendEmail({"email":this.emailForm.get('email').value},this.searchId).subscribe(
    (res:any) => {
      this.dialog.open(ModalComponent, { data: res.message });
    }
  ,error => {
    this.dialog.open(ModalComponent, { data: error });
  })
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
