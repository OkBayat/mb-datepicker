import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mb-libraries';

  date: Date;

  constructor() {
    this.date = new Date();
  }
}
