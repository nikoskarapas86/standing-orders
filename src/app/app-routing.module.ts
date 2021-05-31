import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditStandingOrderComponent } from './edit-standing-order/edit-standing-order.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { RedirectLoaderComponent } from './redirect-loader/redirect-loader.component';
import { SearchStandingOrderComponent } from './search-standing-order/search-standing-order.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,

    canActivate: [AuthGuardService],
  },
  {
    path: 'search',
    component: SearchStandingOrderComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'policyDetails/:searchId',
    component: PolicyDetailsComponent,
  },
  {
    path: 'creditcard/:searchId',
    component: CreditCardComponent,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create-standing-order/create-standing-order.module').then(
        m => m.CreateStandingOrderModule
      ),
    canActivate: [AuthGuardService],
  },

  { path: 'edit/:id', component: EditStandingOrderComponent, canActivate: [AuthGuardService] },
  { path: 'loader', component: RedirectLoaderComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
