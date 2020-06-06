import { NgModule } from '@angular/core';
import { MbDatepickerComponent } from './mb-datepicker.component';
import {CommonModule} from '@angular/common';
import {DateTriggerForDirective} from './date-trigger-for.directive';
import {FormsModule} from '@angular/forms';
import { DatepickerFooterDirective } from './datepicker-footer.directive';
import { MbDatePipe } from './mb-date.pipe';



@NgModule({
  declarations: [
      MbDatepickerComponent,
      DateTriggerForDirective,
      DatepickerFooterDirective,
      MbDatePipe
  ],
    imports: [
        CommonModule,
        FormsModule
    ],
  exports: [
      MbDatepickerComponent,
      DateTriggerForDirective,
      DatepickerFooterDirective,
      MbDatePipe
  ]
})
export class MbDatepickerModule { }
