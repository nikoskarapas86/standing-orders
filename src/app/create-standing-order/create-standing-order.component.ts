import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LineOfBussiness } from '../models/line-of-bussiness';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-standing-order',
  templateUrl: './create-standing-order.component.html',
  styleUrls: ['./create-standing-order.component.scss']
})
export class CreateStandingOrderComponent implements OnInit {
  public linesOfBusinesses$: Observable<LineOfBussiness[]>;
  createForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService
    ) {
      this.linesOfBusinesses$ =this.dataService.searchLinesOfBusiness()
     }

  ngOnInit(): void {
   
    this.buildFormGroup();
  }
  private buildFormGroup(): void {
    this.createForm = this.formBuilder.group({
      lineOfBusiness: null,
      policyNo: null,
      endorsement:''
    })
  }
  submit() {
console.log(this.createForm.value)
  }

}