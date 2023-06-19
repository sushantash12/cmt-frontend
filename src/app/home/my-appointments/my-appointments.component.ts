import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent implements OnInit {
  owner: any = JSON.parse(localStorage.getItem('owner')!);
  appointments: any[] = [];
  addButtonClicked: boolean = false;
  editButtonClicked: boolean = false;
  seeDetailsButtonClicked: boolean = false;
  detailObject: any;
  today: Date = new Date();

  addAppointmentForm = new FormGroup({
    appointmentDate: new FormControl('', [Validators.required]),
    vehicle: new FormControl('', [Validators.required]),
    licensePlate: new FormControl('', [Validators.required]),
    serviceType: new FormControl('', [Validators.required]),
    provider: new FormControl('', [Validators.required]),
    notes: new FormControl('', [Validators.required]),
  });

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAppointmentsOfOwner();
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

  }

  async setProviderNames(){
    this.apiService.getAllProviders().then((response: any) => {
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

}
