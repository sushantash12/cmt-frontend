import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyVehiclesComponent } from './my-vehicles/my-vehicles.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: HomepageComponent},
      {path: 'my-vehicles', component: MyVehiclesComponent},
      {path: 'my-appointments', component: MyAppointmentsComponent},
      {path: 'manage-appointments', component: ManageAppointmentsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
