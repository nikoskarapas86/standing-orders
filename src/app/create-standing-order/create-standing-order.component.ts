import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-standing-order',
  templateUrl: './create-standing-order.component.html',
  styleUrls: ['./create-standing-order.component.scss']
})
export class CreateStandingOrderComponent implements OnInit {
  public linesOfBusinesses: string[];
  createForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.dataService.searchLinesOfBusiness().subscribe(
      linesOfBusinesses => this.linesOfBusinesses = linesOfBusinesses
    )
    this.buildFormGroup();
  }
  private buildFormGroup(): void {
    this.createForm = this.formBuilder.group({
      lineOfBusiness: null,
      policyNo: null,
      endorsement:null
    })
  }
  submit() {

  }

}
