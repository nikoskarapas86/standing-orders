import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from 'src/app/modal/modal.component';
import { LineOfBusiness } from 'src/app/models/line-of-business';
import { SearchPolicyRequest } from 'src/app/models/search-policy-request';
import { SearchPolicyResponse } from 'src/app/models/search-policy-response';
import { DataService } from 'src/app/services/data.service';
import { DestroyService } from 'src/app/services/destroy.service';
import { CreateStandingService } from '../create-standing.service';

@Component({
  selector: 'app-search-policy',
  templateUrl: './search-policy.component.html',
  styleUrls: ['./search-policy.component.scss'],
  providers: [DestroyService],
})
export class SearchPolicyComponent implements OnInit {
  public linesOfBusinesses$: Observable<LineOfBusiness[]>;
  searchPolicyResponse$: Observable<SearchPolicyResponse[]>;
  createForm: FormGroup;
  searchBtnDisabled:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private createStandingService: CreateStandingService,
    public dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private readonly destroy$: DestroyService
  ) {
    this.linesOfBusinesses$ = this.dataService.lineOfbusinesses$;
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  private buildFormGroup(): void {
    this.createForm = this.formBuilder.group({
      lineOfBusiness: null,
      policyNo: null,
      endorsement: '',
    });
  }

  searchSubmit() {
    let searchPolicyRequest: SearchPolicyRequest = new SearchPolicyRequest();
    searchPolicyRequest.policyNo = this.createForm.value.policyNo;
    searchPolicyRequest.lineOfBusiness = this.createForm.value.lineOfBusiness;
    searchPolicyRequest.endorsement = this.createForm.value.endorsement;
    this.createStandingService
      .searchPolicy(searchPolicyRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: SearchPolicyResponse) => {
          this.dataService.setSearchPolicySubject(res);
          this.router.navigate(['/create/payment-way']);
        },
        error => {
          this.dialog.open(ModalComponent, { data: error });
        },
        ()=>{this.searchBtnDisabled = false}
      );
  }

  creationalSubmit() {
    console.log(this.createForm);
  }

  resetForm(): void {
    this.createForm.reset();
  }
}
