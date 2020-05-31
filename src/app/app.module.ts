import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MbDatepickerModule} from '../../projects/mb-datepicker/src/lib/mb-datepicker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        MbDatepickerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
