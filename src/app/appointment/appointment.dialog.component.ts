import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Appointment } from './../calendar/calendar.component'; // Import your interface

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment.dialog.component.html',
  styleUrls: ['./appointment.dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class AppointmentDialogComponent {
  appointmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    private fb: FormBuilder
  ) {
    // Define the form structure with validation
    this.appointmentForm = this.fb.group({
      date: [null, Validators.required],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      color: ['#ddd'], // Optional color input with default
    });
  }

  // Method to handle form submission
  submitFrom() {
    if (this.appointmentForm.valid) {
      const newAppointment: Appointment = {
        uuid: crypto.randomUUID(), // Generate a unique ID
        ...this.appointmentForm.value,
      };
      this.dialogRef.close(newAppointment); // Close dialog and pass the data back
    }
  }

  // Method to close dialog without saving
  closeDialog(): void {
    this.dialogRef.close();
  }
}
