import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from '../modal/modal.component';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private readonly destroy$: DestroyService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
    this.searchId = history.state.searchId;
  }

  buildFormGroup(): void {
    this.form = this.formBuilder.group({
      iban: null,
    });
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
          });
        },
        error => {
          this.dialog.open(ModalComponent, { data: error.error.error });
        }
      );
  }

  validate(): void {
    const request = { iban: this.form.get('iban').value.toString() };
    this.dataService
      .validate(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.isValid = res.isValid;

        if (!this.isValid)
          this.dialog.open(ModalComponent, { data: 'Το IBAN που εισάγατε δεν είναι έγκυρο' });
      });
  }

  cancel(): void {
    this.router.navigate(['/search']);
  }
}
