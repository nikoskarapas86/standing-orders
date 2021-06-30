import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LineOfBusiness } from 'src/app/models/line-of-business';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  receiptForm: FormGroup;
  linesOfBusinesses$: Observable<LineOfBusiness[]>;
  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildFormGroup();
    this.linesOfBusinesses$ = this.dataService.searchLinesOfBusiness();
  }

  private buildFormGroup(): void {
    this.receiptForm = this.formBuilder.group({
      lineOfBusiness: [null, Validators.required],
      policyNumber: [null, Validators.required]

    });
  }
  submit(): void {
    console.log('submited')

  }

  ackHome(): void {
  
    this.router.navigate(['/home']);
  }
}
