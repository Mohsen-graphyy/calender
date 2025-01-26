import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  imports: [MatIconModule, MatButtonModule],
})
export class CalendarComponent {
  viewDate: Date = new Date();
  currentView = 'month';
}
