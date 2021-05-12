import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-iban',
  templateUrl: './search-iban.component.html',
  styleUrls: ['./search-iban.component.scss']
})
export class SearchIbanComponent implements OnInit {
  ibanForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router) {

  }

  ngOnInit(): void {
    this.ibanFormGroup()
  }

  checkIban() {
    this.ibanForm = this.formBuilder.group({
      iban: null
    })
  }

  ibanFormGroup() {
    console.log(this.ibanForm.get('iban').value)
  }
}
