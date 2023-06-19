import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showMenu: boolean = false;
  user: any;
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
      name: 'Users',
      icon: 'assets/icons/people.svg',
      link: '/users',
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
    }
  ];
  isOwner: boolean = false;
  isAdmin: boolean = false;
  constructor(private router: Router) { 
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
}
