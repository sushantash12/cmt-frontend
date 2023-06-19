import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  

  addAppointmentForm = new FormGroup({
    appointmentDate: new FormControl('', [Validators.required]),
    vehicleID: new FormControl('', [Validators.required]),
    serviceType: new FormControl('', [Validators.required]),
    providerID: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAppointmentsOfOwner();
    this.getOwnerVehicles();
  }

  async getAppointmentsOfOwner(){
    this.apiService.getAppointmentsOfOwner(this.owner.ownerID).subscribe(async (response: any) => {
      this.appointments = response;
      await this.setProviderNames();
      console.log(this.appointments);
    },
    (error: any) => {
      console.log(error);
    })
  }

  editAppointment(appointment: any){

  }

  open(mymodal:any, appointment:any){

  }

  addAppointment(){
    this.addButtonClicked = true;
  }

  async setProviderNames(){
    this.apiService.getAllProviders().then((response: any) => {
      this.providers = response;
      for(let i = 0; i < this.appointments.length; i++){
        for(let j = 0; j < response.length; j++){
          if(this.appointments[i].providerID == response[j].providerID){
            this.appointments[i].provider = response[j];
          }
        }
      }
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

}
