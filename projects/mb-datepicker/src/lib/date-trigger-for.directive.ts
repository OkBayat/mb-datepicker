import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {MbDatepickerComponent} from './mb-datepicker.component';
import {MouseEventService} from './mouse-event.service';

@Directive({
    selector: '[mbDateTriggerFor]',
    providers: [MouseEventService]
})
export class DateTriggerForDirective {
    @Input('mbDateTriggerFor') datepicker: MbDatepickerComponent;

    constructor(
        private mouseEventService: MouseEventService,
        private elementRef: ElementRef
    ) {}

    @HostListener('click') private onClick() {
        const
            elm = this.elementRef.nativeElement as HTMLElement,
            clientRect = elm.getBoundingClientRect();

        this.mouseEventService
            .click
            .subscribe(isOpen => {
                if (isOpen) {
                    this.datepicker.open();
                    const datepickerElm = this.datepicker.elementRef.nativeElement as HTMLElement;
                    datepickerElm.style.left = clientRect.left + 'px';
                    datepickerElm.style.top = clientRect.bottom + 'px';
                } else {
                    this.datepicker.close();
                }
            });
    }

}
