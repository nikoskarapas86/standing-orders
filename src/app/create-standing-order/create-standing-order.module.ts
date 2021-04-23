import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPolicyComponent } from './search-policy/search-policy.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateRoutingModule } from './create-standing-order-routing.module';
import { CreateStandingOrderComponent } from './create-standing-order.component';
import { MaterialModule } from '../material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StandingOrderComponent } from './standing-order/standing-order.component';



@NgModule({
  declarations: [
    CreateStandingOrderComponent,
    SearchPolicyComponent,
    StandingOrderComponent
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
