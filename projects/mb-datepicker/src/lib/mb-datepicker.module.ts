import { NgModule } from '@angular/core';
import { MbDatepickerComponent } from './mb-datepicker.component';
import {CommonModule} from '@angular/common';
import {DateTriggerForDirective} from './date-trigger-for.directive';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
      MbDatepickerComponent,
      DateTriggerForDirective
  ],
    imports: [
        CommonModule,
        FormsModule
    ],
  exports: [
      MbDatepickerComponent,
      DateTriggerForDirective
  ]
})
export class MbDatepickerModule { }
