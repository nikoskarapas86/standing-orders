import { CommonModule, registerLocaleData } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClientContainerComponent } from './client-container/client-container.component';
import { CreateReceiptModalComponent } from './create-receipt-modal/create-receipt-modal.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';
import { DeleteListComponent } from './delete-list/delete-list.component';
import { EditStandingOrderComponent } from './edit-standing-order/edit-standing-order.component';
import { HomeButtonComponent } from './home-button/home-button.component';
import { HomeComponent } from './home/home.component';
import { IbanComponent } from './iban/iban.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialModule } from './material';
import { ModalComponent } from './modal/modal.component';
import { NavComponent } from './nav/nav.component';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptsTableComponent } from './receipts-table/receipts-table.component';
import { SearchStandingOrderComponent } from './search-standing-order/search-standing-order.component';
import { SearchTableComponent } from './search-table/search-table.component';
import { TokenInterceptor } from './services/token-interceptor';
import { UpdateReceiptModalComponent } from './update-receipt-modal/update-receipt-modal.component';
import localeEl from '@angular/common/locales/el';

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
    ModalComponent,
    HomeButtonComponent,
    PolicyDetailsComponent,
    LoaderComponent,
    CreditCardFormComponent,
    ClientContainerComponent,
    ReceiptComponent,
    ReceiptsTableComponent,
    UpdateReceiptModalComponent,
    CreateReceiptModalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'el' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
