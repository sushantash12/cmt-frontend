import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyVehiclesComponent } from './my-vehicles/my-vehicles.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { ManageServiceProvidersComponent } from './manage-service-providers/manage-service-providers.component';
import { AddRemoveAdminsComponent } from './add-remove-admins/add-remove-admins.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: HomepageComponent},
      {path: 'my-vehicles', component: MyVehiclesComponent},
      {path: 'my-appointments', component: MyAppointmentsComponent},
      {path: 'manage-appointments', component: ManageAppointmentsComponent},
      {path: 'manage-service-providers', component: ManageServiceProvidersComponent},
      {path: 'add-remove-admins', component: AddRemoveAdminsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
