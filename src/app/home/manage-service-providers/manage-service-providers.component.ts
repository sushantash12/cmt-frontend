import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-service-providers',
  templateUrl: './manage-service-providers.component.html',
  styleUrls: ['./manage-service-providers.component.css']
})
export class ManageServiceProvidersComponent implements OnInit {
  providers: any = [];
  editButtonClicked: boolean = false;
  addButtonClicked: boolean = false;
  deletedProvider: any;

  selectedProvider: any;
  editProviderForm = new FormGroup({
    providerID: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  addProviderForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(private apiService: ApiService, private modalService: NgbModal, private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders() {
    this.apiService.getAllProviders().then((data: any) => {
      this.providers = data;
    },
    (error) => {
      console.log(error);
    });
  }

  addServiceProvider() {
    this.addButtonClicked = true;
  }

  editProvider(provider: any) {
    this.selectedProvider = provider;
    this.editProviderForm.controls.providerID.setValue(provider.providerID);
    this.editProviderForm.controls.name.setValue(provider.name);
    this.editProviderForm.controls.address.setValue(provider.address);
    this.editProviderForm.controls.email.setValue(provider.email);
    this.editProviderForm.controls.phone.setValue(provider.phone);
    this.editButtonClicked = true;
  }

  open(content: any, provider: any) {
    this.deletedProvider = provider;
    this.modalService.open(content);
  }

  deleteProvider() {
    this.apiService.deleteProvider(this.deletedProvider.providerID).subscribe((data: any) => {
      this.toastr.success(data.message);
      this.modalService.dismissAll();
      this.getProviders();
    },
    (error) => {
      this.toastr.error(error.error.message);
    });
  }

  onAdd(){
    let provider = this.addProviderForm.value;
    this.apiService.addProvider(provider).subscribe((data: any) => {
      this.toastr.success(data.message);
      this.getProviders();
      this.addButtonClicked = false;
    },
    (error) => {
      this.toastr.error(error.error.message);
    });
  }

  onEdit(){
    let provider = this.editProviderForm.value;
    this.apiService.updateProvider(provider).subscribe((data: any) => {
      this.toastr.success(data.message);
      this.getProviders();
      this.editButtonClicked = false;
    },
    (error) => {
      this.toastr.error(error.error.message);
    });
  }

}
