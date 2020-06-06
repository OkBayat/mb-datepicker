import {Pipe, PipeTransform} from '@angular/core';
import {JDate} from 'mb-date';

@Pipe({
    name: 'mbDate'
})
export class MbDatePipe implements PipeTransform {

    transform(value: any, format: string): string {
        const gDate = new Date(value);
        return new JDate(gDate.getTime()).format(format);
    }

}
