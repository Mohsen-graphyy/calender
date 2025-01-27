import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Appointment } from '../calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointmentDetails.component.html',
  imports: [MatDialogModule, CommonModule, MatButtonModule],
})
export class AppointmentModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { date: Date; appointments: Appointment[] }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
