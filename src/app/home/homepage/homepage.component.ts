import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user: any;
  role: any;
  vehicles: any[] = [];
  notifications: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.user = localStorage.getItem('role') == 'owner' ? JSON.parse(localStorage.getItem('owner')!) : JSON.parse(localStorage.getItem('admin')!);
    if(this.role == 'owner'){
      this.getVehiclesWithMR();
    }
  }

  getVehiclesWithMR(){
    this.api.getVehiclesOfOwnerWithMR(this.user.ownerID).subscribe((response: any) => {
      this.vehicles = response;
      // Set notifications
      // Find vehicles which have maintenanceRecords, then for each maintenanceRecord find the latest one using date
      // Then find the difference between the latest maintenanceRecord date and today's date
      // If the difference is less than 30 days, then add the message string to notifications array
      this.vehicles.forEach((vehicle) => {
        if(vehicle.maintenanceRecords.length > 0){
          // use each record's date to find the latest one
          let latestRecord = vehicle.maintenanceRecords[0];
          vehicle.maintenanceRecords.forEach((record: any) => {
            if(record.date > latestRecord.date){
              latestRecord = record;
            }
          });
          // find difference between latestRecord date and today's date
          let today = new Date();
          let recordDate = new Date(latestRecord.nextMaintenanceDate);
          const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
          const utc2 = Date.UTC(recordDate.getFullYear(), recordDate.getMonth(), recordDate.getDate());
          let difference = Math.abs(utc1 - utc2);
          let days = Math.ceil(difference / (1000 * 3600 * 24));
          console.log(days);
          if(days < 30){
            this.notifications.push('Your vehicle '+vehicle.make+' '+vehicle.model+' is due for maintenance on '+latestRecord.nextMaintenanceDate+'.');
          }
        }
      });
      console.log(this.notifications);
    }, (error: any) => {
      console.log(error);
    })
  }

}
