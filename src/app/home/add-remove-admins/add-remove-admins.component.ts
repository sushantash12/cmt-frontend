import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-remove-admins',
  templateUrl: './add-remove-admins.component.html',
  styleUrls: ['./add-remove-admins.component.css']
})
export class AddRemoveAdminsComponent implements OnInit {
  admins: any = [];
  addButtonClicked: boolean = false;
  deletedAdmin: any;
  addAdminForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    isSuperAdmin: new FormControl(false, Validators.required),
  });
  user = JSON.parse(localStorage.getItem('admin') || '{}');


  constructor(private apiService: ApiService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    this.apiService.getAllAdmins().subscribe((data: any) => {
      this.admins = data;
      // remove the current admin from the list
      this.admins = this.admins.filter((admin: any) => admin.username !== this.user.username);
    },
    (error) => {
      console.log(error);
    });
  }

  addAdmin(){
    this.addButtonClicked = true;
  }

  open(content: any, admin: any) {
    this.deletedAdmin = admin;
    this.modalService.open(content);
  }

  deleteAdmin() {
    this.apiService.deleteAdmin(this.deletedAdmin.username).subscribe((data: any) => {
      this.toastr.success(data.message);
      this.modalService.dismissAll();
      this.getAdmins();
    },
    (error) => {
      console.log(error);
      this.toastr.error(error.error.error);
    });
  }

  onAdd(){
    this.apiService.addAdmin(this.addAdminForm.value).subscribe((data: any) => {
      this.toastr.success(data.message);
      this.addButtonClicked = false;
      this.getAdmins();
    },
    (error) => {
      console.log(error);
      this.toastr.error(error.error.error);
    });
  }

}
