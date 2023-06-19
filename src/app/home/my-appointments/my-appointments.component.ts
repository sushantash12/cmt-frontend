import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent implements OnInit {
  owner: any = JSON.parse(localStorage.getItem('owner')!);
  appointments: any[] = [];
  providers: any[] = [];
  addButtonClicked: boolean = false;
  editButtonClicked: boolean = false;
  seeDetailsButtonClicked: boolean = false;
  detailObject: any;
  today: Date = new Date();
  vehicles: any[] = [];
  deletedAppointment: any;
  

  addAppointmentForm = new FormGroup({
    appointmentDate: new FormControl('', [Validators.required]),
    vehicleID: new FormControl('', [Validators.required]),
    serviceType: new FormControl('', [Validators.required]),
    providerID: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });

  editAppointmentForm = new FormGroup({
    appointmentID: new FormControl(''),
    appointmentDate: new FormControl('', [Validators.required]),
    vehicleID: new FormControl('', [Validators.required]),
    serviceType: new FormControl('', [Validators.required]),
    providerID: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });

  constructor(private apiService: ApiService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAppointmentsOfOwner();
    this.getOwnerVehicles();
  }

  getAppointmentsOfOwner(){
    this.apiService.getAppointmentsOfOwner(this.owner.ownerID).subscribe((response: any) => {
      this.appointments = response;
      this.setProviderNames();
      console.log(this.appointments);
    },
    (error: any) => {
      console.log(error);
    })
  }

  editAppointment(appointment: any){
    this.editButtonClicked = true;
    this.editAppointmentForm.setValue({
      appointmentID: appointment.appointmentID,
      appointmentDate: appointment.appointmentDate,
      vehicleID: appointment.vehicleID,
      serviceType: appointment.serviceType,
      providerID: appointment.providerID,
      notes: appointment.notes
    })
  }

  open(mymodal:any, appointment:any){
    this.deletedAppointment = appointment;
    this.modalService.open(mymodal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      console.log(result);
    }, (reason: any) => {
    });
  }

  cancelAppointment(){
    let today = new Date();
    let todayString = today.toISOString();
    let obj = {
      appointmentStatus: 'Cancelled',
      lastUpdate: todayString,
      appointmentDate: this.deletedAppointment.appointmentDate,
      vehicleID: this.deletedAppointment.vehicleID,
      serviceType: this.deletedAppointment.serviceType,
      providerID: this.deletedAppointment.providerID,
      notes: this.deletedAppointment.notes
    }
    this.apiService.updateAppointmentForOwner(obj, this.deletedAppointment.appointmentID).subscribe((response: any) => {
      this.toastr.success(response.message);
      this.getAppointmentsOfOwner();
      this.modalService.dismissAll();
    },
    (error: any) => {
      this.toastr.error(error.error.message);
    }

    )
  }

  addAppointment(){
    this.addButtonClicked = true;
  }

  setProviderNames(){
    this.apiService.getAllProviders().then((response: any) => {
      this.providers = response;
    })
  }

  seeDetails(appointment: any){
    this.seeDetailsButtonClicked = true;
    this.detailObject = appointment;
  }

  scheduleAppointment(){
    console.log(this.addAppointmentForm.value);
    let obj={
      appointmentDate: this.addAppointmentForm.value.appointmentDate,
      vehicleID: this.addAppointmentForm.value.vehicleID,
      serviceType: this.addAppointmentForm.value.serviceType,
      providerID: this.addAppointmentForm.value.providerID,
      notes: this.addAppointmentForm.value.notes,
      appointmentStatus: 'Open',
      lastUpdate: ''
    }
    this.apiService.addAppointmentForOwner(obj).subscribe((response: any) => {
      this.toastr.success(response.message);
      this.getAppointmentsOfOwner();
      this.addButtonClicked = false;
    }, (error: any) => {
      this.toastr.error(error.error.message);
    }
    )
  }

  getOwnerVehicles(){
    this.apiService.getVehiclesOfOwner(this.owner.ownerID).subscribe((response: any) => {
      this.vehicles = response;
    }, (error: any) => {
      console.log(error);
    })
  }

  updateAppointment(){
    let today = new Date();
    let todayString = today.toISOString();
    let appointmentID = this.editAppointmentForm.value.appointmentID;

    let obj={
      appointmentDate: this.editAppointmentForm.value.appointmentDate,
      vehicleID: this.editAppointmentForm.value.vehicleID,
      serviceType: this.editAppointmentForm.value.serviceType,
      providerID: this.editAppointmentForm.value.providerID,
      notes: this.editAppointmentForm.value.notes,
      appointmentStatus: 'Open',
      lastUpdate: todayString
    } 
    
    this.apiService.updateAppointmentForOwner(obj, appointmentID).subscribe((response: any) => {
      this.toastr.success(response.message);
      this.getAppointmentsOfOwner();
      this.editButtonClicked = false;
    },
    (error: any) => {
      this.toastr.error(error.error.message);
    }
    )
  }

  
}
