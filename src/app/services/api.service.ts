import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  ownerLogin(email: string, password: string){
    return this.http.post(this.baseUrl + '/users/login', {email, password});
  }

  adminLogin(username: string, password: string){
    return this.http.post(this.baseUrl + '/admin/login', {username, password});
  }

  getVehiclesOfOwner(ownerId: string){
    // add authorization header with jwt token
    let headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return this.http.get(this.baseUrl + '/vehicles/' + ownerId, {headers});
  }

  addVehicleForOwner(vehicle: any){
    // add authorization header with jwt token
    let headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return this.http.post(this.baseUrl + '/vehicles', vehicle, {headers});
  }

  updateVehicleForOwner(vehicle: any){
    // add authorization header with jwt token
    let headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return this.http.put(this.baseUrl + '/vehicles/'+ vehicle.vehicleID, vehicle, {headers});
  }

  deleteVehicleForOwner(vehicleId: string){
    // add authorization header with jwt token
    let headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return this.http.delete(this.baseUrl + '/vehicles/'+ vehicleId, {headers});
  }

  getAppointmentsOfOwner(ownerId: string){
    // add authorization header with jwt token
    let headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return this.http.get(this.baseUrl + '/appointments/' + ownerId, {headers});
  }

  async getAllProviders(){
    // add authorization header with jwt token
    let headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return await this.http.get(this.baseUrl + '/providers', {headers}).toPromise();
  }

  addAppointmentForOwner(appointment: any){
    // add authorization header with jwt token
    let headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return this.http.post(this.baseUrl + '/appointments', appointment, {headers});
  }
}
