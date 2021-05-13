import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private createStandingService:CreateStandingService 
    
    ) { }

  ngOnInit(): void {
    this.creationalFormGroup()
    this.createStandingService.createOrderResponse$.subscribe((res: CreateOrderRersponse) => {
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
