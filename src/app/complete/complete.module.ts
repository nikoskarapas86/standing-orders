import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CompleteRoutingModule } from './complete-routing.module';
import { MaterialModule } from '../material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompleteComponent } from './complete.component';

@NgModule({
  declarations: [CompleteComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CompleteRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CompleteModule {}
