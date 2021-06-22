import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditStandingOrderComponent } from './edit-standing-order/edit-standing-order.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { LoaderComponent } from './loader/loader.component';
import { SearchStandingOrderComponent } from './search-standing-order/search-standing-order.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ClientContainerComponent } from './client-container/client-container.component';

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
    path: 'policyDetails',
    // component: PolicyDetailsComponent,
    component: ClientContainerComponent,
  },
  {
    path: 'creditcard/:searchId',
    component: ClientContainerComponent,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create-standing-order/create-standing-order.module').then(
        m => m.CreateStandingOrderModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'complete',
    // TODO: back to complete and remove it from app.module.ts
    // component: ClientContainerComponent,
    loadChildren: () => import('./complete/complete.module').then(m => m.CompleteModule),
  },

  { path: 'edit/:id', component: EditStandingOrderComponent, canActivate: [AuthGuardService] },
  { path: 'loader', component: LoaderComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
