import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {MbDatepickerComponent} from './mb-datepicker.component';
import {MouseEventService} from './mouse-event.service';

@Directive({
    selector: '[mbDateTriggerFor]',
    providers: [MouseEventService]
})
export class DateTriggerForDirective implements OnInit {
    @Input('mbDateTriggerFor') datepicker: MbDatepickerComponent;
    @Input() format: string;

    constructor(
        private mouseEventService: MouseEventService,
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        if (this.format) {
            this.subscribeDateChangesToFormatInputValue();
        }
    }

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

    private subscribeDateChangesToFormatInputValue(): void {
        this.datepicker.dateChange.subscribe(() => {
            this.elementRef.nativeElement.value =
                this.datepicker.selectedDate.format(this.format);
        });
    }
}
