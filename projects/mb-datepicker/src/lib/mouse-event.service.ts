import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MouseEventService {
    click: Observable<boolean>;

    constructor() {
        this.clickObservable();
    }

    private clickObservable(): void {
        this.click = Observable.create((observer: Observer<boolean>) => {
            observer.next(true);

            const handler = () => {
                observer.next(false);
                document.removeEventListener('click', handler);
            };

            setTimeout(() => document.addEventListener('click', handler));
        });
    }
}
