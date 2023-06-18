import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('owner', Validators.required)
  });

  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm.controls.username.value);
    console.log(this.loginForm.controls.password.value);
    console.log(this.loginForm.controls.role.value);

    if(this.loginForm.controls.role.value == 'owner'){
      this.apiService.ownerLogin(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe((res : any)=>{
        if(res?.token){
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', 'owner');
          localStorage.setItem('owner', JSON.stringify(res.owner));
          this.router.navigate(['/home']);
          this.toastr.success('Login Successful');
        }
      }, (err: any)=>{
        this.toastr.error(err.error?.error);
      })
    }
    else if(this.loginForm.controls.role.value == 'admin'){
      this.apiService.adminLogin(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe((res:any)=>{
        if(res?.token){
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', 'admin');
          this.toastr.success('Login Successful');
        }
      }, (err: any)=>{
        this.toastr.error(err.error?.error);
      })
    }
  }

}
