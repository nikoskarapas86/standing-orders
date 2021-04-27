import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchStandingOrderComponent } from './search-standing-order/search-standing-order.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SearchTableComponent } from './search-table/search-table.component';
import { CommonModule } from '@angular/common';
import { EditStandingOrderComponent } from './edit-standing-order/edit-standing-order.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { IbanComponent } from './iban/iban.component';
import { DeleteListComponent } from './delete-list/delete-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    SearchStandingOrderComponent,

    SearchTableComponent,
    EditStandingOrderComponent,
    CreditCardComponent,
    IbanComponent,
    DeleteListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
