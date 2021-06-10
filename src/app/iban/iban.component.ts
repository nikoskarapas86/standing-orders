import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from '../modal/modal.component';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';
import { EditService } from '../services/edit.service';



@Component({
  selector: 'app-iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.scss'],
  providers: [DestroyService],
})
export class IbanComponent implements OnInit {
  form: FormGroup;
  isValid: boolean = false;
  searchId: string;
  policyResponseForm: FormGroup;
  isIbanValid: boolean = false;
  paymentTypes:any[] = [{title:"επιλογή νέου IBAN",value:'IBAN'},{title:"Αλλαγή τρόπου πληρωμής σε Κάρτα",value:'CARD'}];
  paymentType:string;
  emailForm: FormGroup;
  _isEmailDisabled: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private readonly destroy$: DestroyService,
    public editService: EditService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
    this.buildisplayedFormGroup();
    this. emailFormGroup();
    this.fillPolicyResponseForm(this.editService.selectedStandingOrder)
    this.searchId = history.state.searchId;
  }
  paymentWayChoise($event){
    this.paymentType =$event.value
  }

  private buildisplayedFormGroup(): void {
    this.policyResponseForm = this.formBuilder.group({
      address: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      policyNo: [{ value: '', disabled: true }],
      endorsement: [{ value: '', disabled: true }],
      iban:[{ value: '', disabled: true }],
      paymentTypeSelect:''

    })
  }
  buildFormGroup(): void {
    this.form = this.formBuilder.group({
      iban: null,
    });
  }

  ibanvalid(event) {
    this.isIbanValid = event ? true : false
  }
  fillPolicyResponseForm(res: any) {
    for (let item in res) {
      res[item] ? this.policyResponseForm.controls[item]?.setValue(res[item]) : this.policyResponseForm.controls[item]?.setValue(null);
    }
  }

  submit(): void {
    const request = {
      id: this.activatedRoute.snapshot.params.id,
      iban: this.form.get('iban').value.toString(),
    };

    this.dataService
      .updateBankAccount(request, this.searchId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.dialog.open(ModalComponent, {
            data: 'Ο τραπεζικός λογαριασμός ενημερώθηκε επιτυχώς',
          }).afterClosed().subscribe( ()=> this.router.navigate(['/search']));
        },
        error => {
          this.dialog.open(ModalComponent, { data: error.error.error });
        }
      );
  }

  validate(): void {
    const request = { iban: this.form.get('iban').value.trim().toString() };
    this.dataService
      .validate(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.isValid = res.isValid;

        if (!this.isValid)
          this.dialog.open(ModalComponent, { data: 'Το IBAN που εισάγατε δεν είναι έγκυρο' });
      });
  }

  

  set isEmailDisabled(val: boolean) {
    this._isEmailDisabled = val
  }

  get isEmailDisabled() {
    return this._isEmailDisabled;
  }

  sendEmail() {
    this.isEmailDisabled = true;
    this.dataService.sendEmail({ "email": this.emailForm.get('email').value }, this.searchId).subscribe(
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


}
