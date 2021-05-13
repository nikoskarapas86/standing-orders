import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.scss'],
})
export class IbanComponent implements OnInit {
  form: FormGroup;
  isValid: boolean = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {}

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

    this.dataService.update(request).subscribe(res => {
      console.log(res);
    });
  }

  validate(): void {
    const request = { iban: this.form.get('iban').value.toString() };
    this.dataService.validate(request).subscribe(res => {
      console.log(res);
      this.isValid = res.isValid;
    });
  }
}
