import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPolicyComponent } from './search-policy/search-policy.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateRoutingModule } from './create-standing-order-routing.module';
import { CreateStandingOrderComponent } from './create-standing-order.component';
import { MaterialModule } from '../material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentWayCheckerComponent } from './payment-way-checker/payment-way-checker.component';
import { SearchIbanComponent } from './search-iban/search-iban.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { EmailComponent } from './email/email.component';




@NgModule({
  declarations: [
    CreateStandingOrderComponent,
    SearchPolicyComponent,
    PaymentWayCheckerComponent,
    SearchIbanComponent,
    CreateOrderComponent,
    EmailComponent
  
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CreateRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CreateStandingOrderModule { }
