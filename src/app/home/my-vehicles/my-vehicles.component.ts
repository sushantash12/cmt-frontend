import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.css']
})
export class MyVehiclesComponent implements OnInit {
  owner: any = JSON.parse(localStorage.getItem('owner')!);
  vehicles: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getVehiclesOfOwner();
  }

  getVehiclesOfOwner(){
    this.apiService.getVehiclesOfOwner(this.owner.ownerID).subscribe((response: any) => {
      this.vehicles = response;
      console.log(this.vehicles);
    }, (error: any) => {
      console.log(error);
    })
  }

  addVehicle(){
  }

  editVehicle(vehicle: any){
  }

  deleteVehicle(vehicle: any){
  }

}
