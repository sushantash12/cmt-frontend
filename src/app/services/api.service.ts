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
}
