import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user: any;
  role: any;

  constructor() { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.user = localStorage.getItem('role') == 'owner' ? JSON.parse(localStorage.getItem('owner')!) : JSON.parse(localStorage.getItem('admin')!);
  }

}
