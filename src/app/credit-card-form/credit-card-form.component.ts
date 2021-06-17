import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from '../modal/modal.component';
import { PolicyDetailService } from '../policy-details/policy-details.service';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';
import { EditService } from '../services/edit.service';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent implements OnInit {
  paymentTypes: any[] = [{ title: "επιλογή νέας Κάρτας", value: 'CARD' }, { title: "Αλλαγή τρόπου πληρωμής σε IBAN", value: 'IBAN' }];
  paymentType: string;
  cardForm: FormGroup;
  ibanForm: FormGroup;
  emailForm: FormGroup;
  searchId: string;
  _isEmailDisabled: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public editService: EditService,
    public dialog: MatDialog,
    private readonly destroy$: DestroyService,
    private dataService: DataService,
    private router: Router,
    private policyDetailService: PolicyDetailService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

  


    this.getCard();
    this.buildCardFormGroup();
    this.emailFormGroup();
    this.buildIbanFormGroup();
    this.searchId = history.state.searchId;
  }

  emailFormGroup() {
    this.emailForm = this.formBuilder.group({
      email: ''
    })
  }
  buildIbanFormGroup(): void {
    this.ibanForm = this.formBuilder.group({
      iban: null,
    });
  }

  paymentWayChoise($event) {
    this.paymentType = $event.value
  }

  fillPolicyResponseForm(res: any) {
    for (let item in res) {
      res[item] ? this.cardForm.controls[item]?.setValue(res[item]) : this.cardForm.controls[item]?.setValue(null);
    }
  }

  getCard() {
    this.editService.getCard(this.editService.selectedStandingOrder.tokenOfCardNumber).subscribe(

      res => {
        this.fillPolicyResponseForm(res)
      }
    )
  }

  submit(): void {

    const request = {
      id: this.activatedRoute.snapshot.params.id,
      iban: this.ibanForm.get('iban').value.toString().trim(),
    };

    this.dataService
      .updateBankAccount(request, this.searchId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.dialog.open(ModalComponent, {
            data: 'Ο τραπεζικός λογαριασμός ενημερώθηκε επιτυχώς',
          }).afterClosed().subscribe(() => this.router.navigate(['/search']));
        },
        error => {
          this.dialog.open(ModalComponent, { data: error.error.error });
        }
      );
  }

  buildCardFormGroup(): void {
    this.cardForm = this.formBuilder.group({
      cardExpiry: [{ value: '', disabled: true }],
      cardNumber: [{ value: '', disabled: true }],
      paymentTypeSelect: ''
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
    this.dataService.sendEmail({ email: this.emailForm.get('email').value }, this.searchId).subscribe(
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
}
