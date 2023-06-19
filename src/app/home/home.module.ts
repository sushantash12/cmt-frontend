import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyVehiclesComponent } from './my-vehicles/my-vehicles.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomepageComponent,
    MyVehiclesComponent,
    MyAppointmentsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class HomeModule { }
