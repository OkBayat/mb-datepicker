import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MbDatepickerComponent} from './mb-datepicker.component';
import {MbDatepickerComponentHarness} from './mb-datepicker.component.harness';
import {JDate} from 'mb-date';

describe('MbDatepickerComponent', () => {
    let component: MbDatepickerComponent;
    let fixture: ComponentFixture<MbDatepickerComponent>;
    let harness: MbDatepickerComponentHarness;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MbDatepickerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MbDatepickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        harness = new MbDatepickerComponentHarness(fixture);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open', () => {
        const elm = harness.open();
        expect(elm).toBeTruthy();
    });

    it('should go next month', () => {
        const date = new JDate();
        const nextMonthDate = harness.goNextMonth();
        const expectDate = new JDate(nextMonthDate.getTime());
        expectDate.setMonth(expectDate.getMonth() - 1);
        expect(date.getMonth()).toBe(expectDate.getMonth());
    });
});
