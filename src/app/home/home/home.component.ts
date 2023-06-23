import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showMenu: boolean = false;
  user: any;
  changePasswordForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    oldPassword: new FormControl('',[Validators.required]),
    newPassword: new FormControl('', [Validators.required])
  });
  menuItems: any[] = [
    {
      name: 'Home',
      icon: 'assets/icons/home.svg',
      link: '',
      admin: true,
      owner: true,
      selected: true
    },
    {
      name: 'Manage Appointments',
      icon: 'assets/icons/people.svg',
      link: '/manage-appointments',
      admin: true,
      owner: false,
      selected: false
    },
    {
      name: 'My Appointments',
      icon: 'assets/icons/event.svg',
      link: '/my-appointments',
      admin: false,
      owner: true,
      selected: false
    },
    {
      name: 'Manage Service Providers',
      icon: 'assets/icons/manage_accounts.svg',
      link: '/manage-service-providers',
      admin: true,
      owner: false,
      selected: false
    },
    { 
      name: 'My Vehicles',
      icon: 'assets/icons/vehicles.svg',
      link: '/my-vehicles',
      admin: false,
      owner: true,
      selected: false
    },
    {
      name: 'Add/Remove Admins',
      icon: 'assets/icons/admin.svg',
      link: '/add-remove-admins',
      admin: false,
      owner: false,
      selected: false
    }
  ];
  isOwner: boolean = false;
  isAdmin: boolean = false;
  isFirstTime: boolean = false;
  constructor(private router: Router, private apiService: ApiService, private toastr: ToastrService) { 
    // get url and set selected menu item
    let url = this.router.url;
    url = url.replace('/home', '');
    this.menuItems.forEach((element) => {
      element.selected = false;
      if(element.link == url){
        element.selected = true;
      }
    }
    );
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('role') == 'owner' ? JSON.parse(localStorage.getItem('owner')!) : JSON.parse(localStorage.getItem('admin')!);
    this.isOwner = localStorage.getItem('role') == 'owner';
    this.isAdmin = localStorage.getItem('role') == 'admin';
    if(this.isAdmin){
      if(this.user.isFirstTime){
        this.isFirstTime=true;
        this.changePasswordForm.controls['username'].setValue(this.user.username);
      }
    }
    if(this.isAdmin && this.user.isSuperAdmin){
      // set add/remove admins menu item to admin true
      this.menuItems.forEach((element) => {
        if(element.name == 'Add/Remove Admins'){
          element.admin = true;
        }
      }
      );
    }
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  navigate(item: any){
    if(!item.selected){
      this.menuItems.forEach((element) => {
        element.selected = false;
      });
      item.selected = true;
      this.router.navigate(['home'+item.link]);
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  onChangePassword(){
    this.apiService.changePassword(this.changePasswordForm.value).subscribe((data: any) =>{
      this.user.isFirstTime = false;
      localStorage.setItem('admin', JSON.stringify(this.user))
      this.isFirstTime = false;
      this.toastr.success(data?.message);
    },
    (error: any) => {
      this.toastr.error(error?.error?.error)
    }
    );
    
  }
}
