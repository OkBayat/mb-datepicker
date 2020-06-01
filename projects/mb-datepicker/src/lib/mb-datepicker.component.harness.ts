import {ComponentFixture} from '@angular/core/testing';
import {MbDatepickerComponent} from './mb-datepicker.component';
import {By} from '@angular/platform-browser';
import {DebugElement, ElementRef} from '@angular/core';

export class MbDatepickerComponentHarness {
    private component: MbDatepickerComponent;

    constructor(private fixture: ComponentFixture<MbDatepickerComponent>) {
        this.component = fixture.componentInstance;
    }

    open(): HTMLElement {
        this.component.open();
        return this.$('.mb-datepicker__container').nativeElement;
    }
    goNextMonth(): Date {
        this.open();
        // this.$('.chevron--left').triggerEventHandler('click', null);
        this.component.forwardMonth();
        return this.component.calcDate.gDate;
    }

    private $(selector: string): DebugElement {
        return this.fixture.debugElement.query(By.css(selector));
    }
}
