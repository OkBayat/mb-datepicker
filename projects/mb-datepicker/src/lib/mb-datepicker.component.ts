import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ContentChild,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MbDate} from 'mb-date/dist/src/abstract';
import {JDate} from 'mb-date';
import {GDate} from 'mb-date/dist/src/gdate';
import {DatepickerFooterDirective} from './datepicker-footer.directive';


const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MbDatepickerComponent),
    multi: true
};


@Component({
    selector: 'mb-datepicker',
    exportAs: 'mbDatepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [VALUE_ACCESSOR],
    host: {
        class: 'mb-datepicker'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MbDatepickerComponent implements OnInit, ControlValueAccessor {
    /// Variables
    public weekDays: string[];
    public preMonth: any[] = [];
    public thisMonth: any[] = [];
    public smaller: number;
    public larger: number;
    public years: number[];
    public year: number;
    public months: number[];
    public month: number;
    public hoverDate: any;
    public monthName: string[];

    private calendarType: any;
    private nextMonth: any[] = [];
    private today: number;
    private selectedDate: any;
    calcDate: any;
    type: string;
    isOpen = false;
    config: {
        preMonth: boolean;
        nextMonth: boolean;
    } = {
        preMonth: false,
        nextMonth: false
    };
    gDate: MbDate;

    /// Inputs
    @Input() smallerThan;
    @Input() largerThan;
    @Input() periodHover;
    @Input() api;
    @Output() typeChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() date;
    @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();
    @ContentChild(DatepickerFooterDirective) datepickerFooterTemp: DatepickerFooterDirective;

    /// Functions
    constructor(
        public elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    // --------------------------------
    open() {
        this.getDate();
        this.init();
        this.isOpen = true;
        this.changeDetectorRef.detectChanges();
    }
    // --------------------------------

    ngOnInit() {
        // const self = this;

        // Set calendar type for first time.
        this.setCalendarType();

        /*this.api.open = () => {
            this.getDate();
            this.init();
            this.isOpen = true;
            setTimeout(() => document.addEventListener("click", close));
            this.changeDetectorRef.detectChanges();
        };

        this.api.close = () => {
            close();
        };

        function close(): void {
            self.isOpen = false;
            document.removeEventListener("click", close);
            self.changeDetectorRef.detectChanges();
        }*/

        if (this.periodHover) {
            this.hoverDate = this.selectedDate;
        }
    }

    close() {
        this.isOpen = false;
        this.changeDetectorRef.detectChanges();
    }

    /* ---------------------------------------------------------- */
    /* VALUE_ACCESSOR                                             */
    /* ---------------------------------------------------------- */
    private propagateChange = (_) => { };

    writeValue(value: any) {
        this.date = value;

        if (value) {
            this.gDate = new this.calendarType(value);
        }
        this.propagateChange(this.date);
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn) {
        // this.propagateChange = fn;
    }
    /* ---------------------------------------------------------- */

    /**
     * @description Change or set Calendar and date type
     * @example     Sets "Ja" for type and jDate for calendartype.
     */
    private setCalendarType(): void {
        this.type = 'Ja';
        this.calendarType = JDate;
        // this.api.Date = this.calendarType;
    }

    private init() {
        // Change calendar type When the calendar opens
        this.setCalendarType();

        this.preMonth = [];
        this.thisMonth = [];
        this.nextMonth = [];
        this.years = [];
        this.year = this.calcDate.getFullYear();
        this.months = [];
        this.month = this.calcDate.getMonth();

        let a = this.year - 90;
        let b = this.year + 10;

        if (this.largerThan) {
            a = new this.calendarType(this.largerThan.getTime()).getFullYear();
        }
        if (this.smallerThan) {
            b = new this.calendarType(this.smallerThan.getTime()).getFullYear();
        }
        for (let i = a; i <= b; i++) {
            this.years.push(i);
        }

        const ge = this.type === 'Ge' ? 1 : 0;
        let c = 0 - ge;
        let d = this.type === 'Ge' ? 10 : 11;
        if (this.largerThan) {
            if (new this.calendarType(this.largerThan.getTime()).getFullYear() >= this.calcDate.getFullYear()) {
                c = new this.calendarType(this.largerThan.getTime()).getMonth() - 1;
            }
        }
        if (this.smallerThan) {
            if (new this.calendarType(this.smallerThan.getTime()).getFullYear() <= this.calcDate.getFullYear()) {
                d = new this.calendarType(this.smallerThan.getTime()).getMonth() - 1;
            }
        }

        for (let i = c; i <= d; i++) {
            this.months.push(i);
        }

        if (this.calcDate.getMonth() - 1 < this.months[0] || this.calcDate.getMonth() - 1 > this.months[this.months.length - 1]) {
            this.calcDate.setMonth(this.months[0] + 1);
            this.month = this.months[0] + 1;
        }

        const cDate = this.calcDate,
            cDays = cDate.daysInMonth(),
            cDay = cDate.firstDay() - (this.type === 'Ja' ? 0 : 1),
            pDate = new this.calendarType(new this.calendarType(this.calcDate.getTime()).setMonth(cDate.getMonth() - 1).getTime()),
            pDays = pDate.daysInMonth(),
            nDate = new this.calendarType(new this.calendarType().setMonth(cDate.getMonth() + 1).getTime());

        if (pDays - (pDays - cDay) < 7) {
            this.calcPicker(pDays - cDay, pDays, pDate, this.preMonth);
        }
        this.calcPicker(1, cDays, cDate, this.thisMonth);
        if (1 - cDays < 7) {
            this.calcPicker(1, 42 - cDays - cDay - 1, nDate, this.nextMonth);
        }

        this.changeDetectorRef.detectChanges();
    }

    private calcPicker(start, end, date, array) {
        const time = date.getTime();

        for (let i = start; i <= end; i++) {
            const nDate = new this.calendarType(time);
            nDate.setDate(i);
            array.push(nDate);
        }
    }

    public selectDate(date, clickable) {
        if (clickable) {
            this.selectedDate = date;
            this.date = new Date(date.getTime());
            this.dateChange.emit(this.date);
            // this.api.close();
            document.body.click();
            // this.propagateChange(date.gDate);
            this.writeValue(date.gDate);
            this.gDate = date;
            /*if (this.api.selectDate) {
                this.api.selectDate(date);
            }*/
        }
    }

    public previousMonth() {
        this.calcDate.setMonth(this.calcDate.getMonth() - 1);
        this.init();
    }

    public forwardMonth() {
        const t1 = this.calcDate.getTime();
        this.calcDate.setMonth(this.calcDate.getMonth() + 1);
        this.init();
        if (t1 > this.calcDate.getTime()) {
            this.calcDate = new this.calendarType(t1);
            this.init();
        }
    }

    public goToday() {
        this.calcDate = new this.calendarType();
        this.init();
        this.selectDate(this.calcDate, true);
    }

    public changeYear(value) {
        this.calcDate.setFullYear(value);
        this.init();
    }

    public changeMonth(value) {
        this.calcDate.setMonth(value);
        this.init();
    }

    /**
     * @description change calander type and re render calender
     */
    toggleType(): void {
        // this.calendarTypeService.changeTypeManual();
        this.getDate();
        this.init();
    }

    /**
     * This method converts input date to related type of date
     *
     * @param date Date
     */
    private modifyDate(date): void {
        this.selectedDate = new this.calendarType(date);
        this.date = date;
    }

    /**
     * If the smalerThan parameter has value, this method checks whether
     * it is smaler than the input date or not
     *
     * @param date Date
     */
    private isSmallerThan(date): boolean {
        return this.smallerThan && this.smallerThan.getTime() < date.getTime();
    }

    /**
     * If the largerThan parameter has value, this method checks whether
     * it is larger than the input date or not
     *
     * @param date Date
     */
    private isLargerThan(date): boolean {
        return this.largerThan && this.largerThan.getTime() > date.getTime();
    }

    private getDate() {
        // Change calendar type When the calendar opens
        this.setCalendarType();

        this.today = new this.calendarType().setDate(new this.calendarType().getDate()).getTime();
        this.monthName = new this.calendarType().getMonthNames('long');

        let calcDate;
        if (this.date instanceof Date) {
            // ???
            const date = this.isSmallerThan(this.date)
                ? new Date(this.smallerThan.getTime())
                : this.isLargerThan(this.date) ? new Date(this.largerThan.getTime()) : this.date;

            // Convert date to related type (e.g. Ja or Ge)
            this.modifyDate(date);

            calcDate = this.date;
        } else {
            this.selectedDate = null;
            this.hoverDate = null;

            calcDate = new Date();
        }

        this.calcDate = new this.calendarType(calcDate);
        this.weekDays = this.calcDate.getWeekDays('short');

        this.smaller = this.smallerThan
            ? new this.calendarType(this.smallerThan.getTime()).getTime()
            : new this.calendarType(this.calcDate.getTime() + 24 * 60 * 60 * 100000);

        this.larger = this.largerThan
            ? new this.calendarType(this.largerThan.getTime()).getTime()
            : new this.calendarType(this.calcDate.getTime() - 24 * 60 * 60 * 100000);
    }

    public isToday(date) {
        return date.getFullYear() === new this.calendarType().getFullYear() &&
            date.getMonth() === new this.calendarType().getMonth() &&
            date.getDate() === new this.calendarType().getDate();
    }

    public isSelected(date) {
        if (this.selectedDate) {
            return date.getFullYear() === this.selectedDate.getFullYear() &&
                date.getMonth() === this.selectedDate.getMonth() &&
                date.getDate() === this.selectedDate.getDate();
        } else {
            return false;
        }
    }

    public stopPropagation(e) {
        e.stopPropagation();
    }

    public getHoverDate(date) {
        if (this.periodHover) {
            this.hoverDate = date;
        }
    }

    public convert2gDate(date) {
        return new GDate(date.getTime()).getDate();
    }
}
