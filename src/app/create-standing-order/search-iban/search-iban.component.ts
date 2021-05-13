import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateOrderRequest } from 'src/app/models/create-order-req';
import {SearchPolicyResponse} from 'src/app/models/search-policy-response'
import { IbanRequest } from 'src/app/models/iban-request';
import { DataService } from 'src/app/services/data.service';
import { CreateStandingService } from '../create-standing.service';
import { CreateOrderRersponse } from 'src/app/models/create-order-response';

@Component({
  selector: 'app-search-iban',
  templateUrl: './search-iban.component.html',
  styleUrls: ['./search-iban.component.scss']
})
export class SearchIbanComponent implements OnInit {
  ibanForm: FormGroup
  isValid:boolean = false
  @Output() ibanIsValid = new EventEmitter<any>();
  searchId:string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private createStandingService: CreateStandingService) {

  }

  ngOnInit(): void {
    this.ibanFormGroup()
    this.dataService.searchPolicyResponse$.subscribe((res: SearchPolicyResponse) => this.searchId =res.searchId)
  }

  checkIban() {
    console.log(this.ibanForm.get('iban').value)
    let ibanRequest:IbanRequest = new IbanRequest()
    ibanRequest.iban =this.ibanForm.get('iban').value.trim()
    this.createStandingService.ibanChecker(ibanRequest).subscribe(
      res =>{
        console.log(res.isValid)
        this.isValid =res.isValid
        if(res.isValid){
          this.ibanForm.controls['iban'].disable()
          this.ibanIsValid.emit(true);
        }
      
      }
    )
    
  }

  createOrder(){
console.log('create')
let orderReq :CreateOrderRequest = new CreateOrderRequest();
orderReq.iban =this.ibanForm.get('iban').value.trim()
orderReq.paymentType ="BANK_ACCOUNT"
this.createStandingService.createorder(this.searchId,orderReq).subscribe((res:CreateOrderRersponse) =>{
  if(res){
    console.log(res)
    this.createStandingService.setCreateOrderSubject(res)
    this.router.navigate(['/create/create-order'])
  }
})
  }

  ibanFormGroup() { 
    this.ibanForm = this.formBuilder.group({
      iban: null
    })
  }

} 