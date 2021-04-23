import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateStandingOrderComponent } from "./create-standing-order.component";
import{SearchPolicyComponent} from "./search-policy/search-policy.component";
import { StandingOrderComponent } from "./standing-order/standing-order.component";

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
                path: 'create-order',
                component: StandingOrderComponent,
              },
        ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CreateRoutingModule {}