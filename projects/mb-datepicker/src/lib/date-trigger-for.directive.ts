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
                const datepickerElm = this.datepicker.elementRef.nativeElement as HTMLElement;

                if (isOpen) {
                    this.datepicker.open();
                    const datepickerClientRect = datepickerElm.getBoundingClientRect();
                    const windowHeight = document.body.clientHeight;

                    datepickerElm.style.left = clientRect.left + 'px';

                    // If the datepickerElem goes out from bottom the window
                    if (windowHeight < datepickerClientRect.bottom) {
                        datepickerElm.style.bottom = '0';
                    } else {
                        datepickerElm.style.top = clientRect.bottom + 'px';
                    }
                } else {
                    datepickerElm.style.bottom = 'unset';
                    datepickerElm.style.top = 'unset';
                    datepickerElm.style.left = 'unset';
                    this.datepicker.close();
                }
            });
    }

}
