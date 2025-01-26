import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Appointment {
  uuid?: string;
  date: Date;
  title: string;
  startTime: string;
  endTime: string;
  color?: string;
}

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  imports: [MatIconModule, MatButtonModule],
})
export class CalendarComponent {
  viewDate: Date = new Date();
  currentView = 'month';
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthDays: Date[] = [];
  weeks: Date[][] = [];
  timeSlots: string[] = [];
  appointments: Appointment[] = [
    {
      uuid: '00000000-0000-0000-0000-000000000001',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      title: 'Meeting with Bob',
      startTime: '09:00',
      endTime: '10:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000002',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 2),
      title: 'Lunch with Alice',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000003',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 3),
      title: 'Project Deadline',
      startTime: '15:00',
      endTime: '16:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000004',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      title: 'Doctor Appointment',
      startTime: '10:00',
      endTime: '11:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000005',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      ),
      title: 'Team Meeting',
      startTime: '14:00',
      endTime: '15:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000006',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      title: 'Coffee with Mike',
      startTime: '11:00',
      endTime: '12:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000007',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 4
      ),
      title: 'Client Call',
      startTime: '09:30',
      endTime: '10:30',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000008',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 8),
      title: 'Gym',
      startTime: '17:00',
      endTime: '18:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000009',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1
      ),
      title: 'Dentist Appointment',
      startTime: '11:30',
      endTime: '12:30',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000a',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 2
      ),
      title: 'Birthday Party',
      startTime: '19:00',
      endTime: '21:00',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000b',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 11),
      title: 'Conference',
      startTime: '13:00',
      endTime: '14:00',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000c',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 12),
      title: 'Workshop',
      startTime: '10:00',
      endTime: '12:00',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000d',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 13),
      title: 'Brunch with Sarah',
      startTime: '11:00',
      endTime: '12:00',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000e',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 2
      ),
      title: 'Networking Event',
      startTime: '18:00',
      endTime: '20:00',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000f',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 16),
      title: 'Yoga Class',
      startTime: '07:00',
      endTime: '08:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000010',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 16),
      title: 'Strategy Meeting',
      startTime: '10:00',
      endTime: '11:30',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000011',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 17),
      title: 'Call with Investor',
      startTime: '14:00',
      endTime: '15:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000012',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
      title: 'Team Lunch',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000013',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 3
      ),
      title: 'HR Meeting',
      startTime: '16:00',
      endTime: '17:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000014',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
      title: 'Board Meeting',
      startTime: '11:00',
      endTime: '12:00',
    },
  ];
  constructor() {
    this.appointments.forEach((appointment) => {
      appointment.color = this.getRandomColor();
    });
    this.generateMonthView(this.viewDate);
    this.generateTimeSlots();
  }
  generateMonthView(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.weeks = [];
    this.monthDays = [];
    let week: Date[] = [];

    for (let day = start.getDay(); day > 0; day--) {
      const prevDate = new Date(start);
      prevDate.setDate(start.getDate() - day);
      week.push(prevDate);
      this.monthDays.push(prevDate);
    }

    for (let day = 1; day <= end.getDate(); day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      this.monthDays.push(currentDate);
      week.push(currentDate);
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    for (let day = 1; this.monthDays.length % 7 !== 0; day++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + day);
      this.monthDays.push(nextDate);
    }

    for (let day = 1; week.length < 7; day++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + day);
      week.push(nextDate);
    }

    if (week.length > 0) {
      this.weeks.push(week);
    }
    console.log(this.monthDays);
    console.log(this.weeks);
  }

  getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 0.4;
    return `rgba(${r},${g},${b},${a})`;
  }

  generateTimeSlots() {
    for (let hour = 0; hour <= 24; hour++) {
      const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      this.timeSlots.push(time);
    }
  }

  isEqualDate(date: Date, checkedDate: Date): boolean {
    if (!date || !checkedDate) return false;
    return (
      date.getFullYear() === checkedDate.getFullYear() &&
      date.getMonth() === checkedDate.getMonth() &&
      date.getDate() === checkedDate.getDate()
    );
  }

  getAppointmentsForDate(date: Date) {
    return this.appointments.filter((appointment) =>
      this.isEqualDate(appointment.date, date)
    );
  }
}
