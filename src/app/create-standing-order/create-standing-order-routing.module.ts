import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateStandingOrderComponent } from "./create-standing-order.component";
import { PaymentWayCheckerComponent } from "./payment-way-checker/payment-way-checker.component";
import{SearchPolicyComponent} from "./search-policy/search-policy.component";


const routes: Routes = [
    {
        path: '',
        component: CreateStandingOrderComponent,
        children: [

            {
                path: 'search-policy',
                component: SearchPolicyComponent,
              },
              {
                path: 'payment-way',
                component: PaymentWayCheckerComponent,
              },
        ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CreateRoutingModule {}