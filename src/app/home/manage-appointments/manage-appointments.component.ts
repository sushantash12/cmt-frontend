import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.css']
})
export class ManageAppointmentsComponent implements OnInit {
  selectedProvider: any;
  providers: any[] = [];
  appointments: any[] = [];
  closeAppointmentClicked: boolean = false;
  maintenanceForm = new FormGroup({
    date: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
    nextMaintenanceDate: new FormControl('', Validators.required),
    providerID: new FormControl('', Validators.required),
    appointmentID: new FormControl('', Validators.required),
    mileage: new FormControl('', Validators.required),
    mileageDate: new FormControl(''),
    vehicleID: new FormControl(''),
  });
  detailsButtonClicked: boolean = false;
  selectedAppointment: any;


  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProviders();
  }

  changeProvider() {
    if (this.selectedProvider) {
      this.getAppointments();
      this.detailsButtonClicked = false;
      this.closeAppointmentClicked = false;
    }
  }

  getProviders() {
    this.apiService.getAllProviders().then((res: any) => {
      this.providers = res;
    }
    ).catch((err: any) => {
      console.log(err);
    }
    );
  }

  getAppointments() {
    this.apiService.getAppointmentsOfProvider(this.selectedProvider).subscribe((res: any) => {
      this.appointments = res;
      console.log(res);
    });
  }

  closeAppointment(appointment: any) {
    this.closeAppointmentClicked = true;
    this.detailsButtonClicked = false;
    let today = new Date();
    this.maintenanceForm.controls['date'].setValue(today.toISOString().split('T')[0]);
    this.maintenanceForm.controls['type'].setValue(appointment.serviceType);
    this.maintenanceForm.controls['providerID'].setValue(appointment.providerID);
    this.maintenanceForm.controls['appointmentID'].setValue(appointment.appointmentID);
    this.maintenanceForm.controls['mileage'].setValue(appointment.vehicleDetails[0].mileage);
    // set vehicleID
    this.maintenanceForm.controls['vehicleID'].setValue(appointment.vehicleDetails[0].vehicleID);
  }

  markAsResolved(){
    console.log(this.maintenanceForm.value);
    let obj = {
      vehicleID: this.maintenanceForm.value.vehicleID,
      date: this.maintenanceForm.value.date,
      type: this.maintenanceForm.value.type,
      cost: this.maintenanceForm.value.cost,
      notes: this.maintenanceForm.value.notes,
      nextMaintenanceDate: this.maintenanceForm.value.nextMaintenanceDate,
      providerID: this.maintenanceForm.value.providerID,
      isAppointment: true,
      appointmentID: this.maintenanceForm.value.appointmentID,
      lastUpdate: new Date().toISOString(),
      mileage: this.maintenanceForm.value.mileage,
      mileageDate: this.maintenanceForm.value.date
    }
    this.apiService.createMaintenanceRecord(obj).subscribe((res: any) => {
      console.log(res);
      this.toastr.success(res.message);
      this.closeAppointmentClicked = false;
      this.getAppointments();
    },
    (err: any) => {
      console.log(err);
      this.toastr.error(err.error.message);
    });
  }

  seeAllDetails(appointment: any){
    this.detailsButtonClicked = true;
    this.closeAppointmentClicked = false;
    this.selectedAppointment = appointment;
  }
}
