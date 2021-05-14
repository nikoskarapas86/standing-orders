import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateOrderRersponse } from 'src/app/models/create-order-response';
import { SearchPolicyResponse } from 'src/app/models/search-policy-response';
import { DataService } from 'src/app/services/data.service';
import { CreateStandingService } from '../create-standing.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  creationalForm: FormGroup
  standingOrderID: number;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private createStandingService: CreateStandingService

  ) { }

  ngOnInit(): void {
    this.creationalFormGroup()
    this.createStandingService.createOrderResponse$.subscribe((res: CreateOrderRersponse) => {
      res ? this.fillCreationalForm(res) : this.router.navigate(['/home'])
    })
  }

  fillCreationalForm(res) {
    this.standingOrderID = res.id
    for (let item in res) {
      res[item] ? this.creationalForm.controls[item]?.setValue(res[item]) : this.creationalForm.controls[item]?.setValue(null);
    }
  }
  creationalFormGroup() {
    this.creationalForm = this.formBuilder.group({
      lineOfBusiness: [{ value: '', disabled: true }],
      policyNo: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }],
      street: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      postalCode: [{ value: '', disabled: true }],
      phoneNumber: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      vatNumber: [{ value: '', disabled: true }]
    })
  }
}
