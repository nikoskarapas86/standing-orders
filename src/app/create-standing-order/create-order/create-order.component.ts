import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchPolicyResponse } from 'src/app/models/search-policy-response';
import { DataService } from 'src/app/services/data.service';
import { CreateStandingService } from '../create-standing.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  // "lineOfBusiness": "AUTO",
  // "policyNo": 1389945,        


  creationalForm: FormGroup

  constructor(private formBuilder: FormBuilder, private dataService: DataService,) { }

  ngOnInit(): void {
    this.creationalFormGroup()
    this.dataService.searchPolicyResponse$.subscribe((res: SearchPolicyResponse) => {
      console.log(res)
      this.fillCreationalForm(res)
    })
  }

  fillCreationalForm(res) {
    for (let item in res) {
      res[item] ? this.creationalForm.controls[item]?.setValue(res[item]) : this.creationalForm.controls[item]?.setValue(null);
    }
  }
  creationalFormGroup() {
    this.creationalForm = this.formBuilder.group({
      lineOfBusiness: null,
      policyNo: null,
      lastName: null,
      firstName: null,
      street: null,
      city: null,
      postalCode: null,
      phoneNumber: null,
      email: null,
      vatNumber: null
    })
  }
}
