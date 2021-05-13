import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
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

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup(): void {
    this.form = this.formBuilder.group({
      iban: null,
    });
  }

  submit(): void {
    const request = {
      key: {
        id: 20000074,
        versionNo: 1,
      },

      paymentType: 'BANK_ACCOUNT',

      iban: this.form.get('iban').value.toString(),
    };

    this.dataService
      .update(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {});
  }

  validate(): void {
    const request = { iban: this.form.get('iban').value.toString() };
    this.dataService
      .validate(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.isValid = res.isValid;
      });
  }
}
