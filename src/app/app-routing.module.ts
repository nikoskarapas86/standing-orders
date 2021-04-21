import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStandingOrderComponent } from './create-standing-order/create-standing-order.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchStandingOrderComponent } from './search-standing-order/search-standing-order.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'search',
    component: SearchStandingOrderComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'create', component: CreateStandingOrderComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
