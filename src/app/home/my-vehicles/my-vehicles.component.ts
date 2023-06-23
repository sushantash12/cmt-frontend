import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.css']
})
export class MyVehiclesComponent implements OnInit {
  owner: any = JSON.parse(localStorage.getItem('owner')!);
  vehicles: any[] = [];
  addButtonClicked: boolean = false;
  editButtonClicked: boolean = false;
  today: Date = new Date();
  deletedVehicle: any;
  maintenanceButtonClicked: boolean = false;

  addVehicleForm = new FormGroup({
    make: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    VIN: new FormControl('', [Validators.required]),
    licensePlate: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    mileage: new FormControl('', [Validators.required]),
  });

  editVehicleForm = new FormGroup({
    vehicleID: new FormControl(''),
    make: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    VIN: new FormControl('', [Validators.required]),
    licensePlate: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    mileage: new FormControl('', [Validators.required]),
  });
  selectedVehicle: any;

  constructor(private apiService: ApiService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getVehiclesOfOwner();
  }

  getVehiclesOfOwner(){
    this.apiService.getVehiclesOfOwnerWithMR(this.owner.ownerID).subscribe((response: any) => {
      this.vehicles = response;
      console.log(this.vehicles);
    }, (error: any) => {
      console.log(error);
    })
  }

  addVehicle(){
    this.addButtonClicked = true;
  }

  editVehicle(vehicle: any){
    this.editButtonClicked = true;
    this.editVehicleForm.setValue({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      VIN: vehicle.VIN,
      licensePlate: vehicle.licensePlate,
      mileage: vehicle.mileage,
      state: vehicle.state,
      vehicleID: vehicle.vehicleID
    })
  }

  deleteVehicle(){
    this.apiService.deleteVehicleForOwner(this.deletedVehicle.vehicleID).subscribe((response: any) => {
      this.toastr.success(response?.message);
      this.modalService.dismissAll();
      this.getVehiclesOfOwner();
    }, (error: any) => {
      this.toastr.error(error?.error?.error);
    })
  }

  onAdd(){
    let vehicle = {
      make: this.addVehicleForm.value.make,
      model: this.addVehicleForm.value.model,
      year: this.addVehicleForm.value.year,
      VIN: this.addVehicleForm.value.VIN,
      licensePlate: this.addVehicleForm.value.licensePlate,
      mileage: this.addVehicleForm.value.mileage,
      ownerID: this.owner.ownerID,
      state: this.addVehicleForm.value.state,
      mileageDate: this.today.toISOString().slice(0, 10)
    }
    this.apiService.addVehicleForOwner(vehicle).subscribe((response: any) => {
      this.toastr.success(response?.message);
      this.getVehiclesOfOwner();
      this.addButtonClicked = false;
    }, (error: any) => {
      this.toastr.error(error?.error?.error);
    })
  }

  editButtonCancel(){
    this.editButtonClicked = false;
    this.editVehicleForm.reset();
  }

  onEdit(){
    let vehicle = {
      vehicleID: this.editVehicleForm.value.vehicleID,
      make: this.editVehicleForm.value.make,
      model: this.editVehicleForm.value.model,
      year: this.editVehicleForm.value.year,
      VIN: this.editVehicleForm.value.VIN,
      licensePlate: this.editVehicleForm.value.licensePlate,
      mileage: this.editVehicleForm.value.mileage,
      state: this.editVehicleForm.value.state,
      ownerID: this.owner.ownerID,
      mileageDate: this.today.toISOString().slice(0, 10)
    }
    this.apiService.updateVehicleForOwner(vehicle).subscribe((response: any) => {
      this.toastr.success(response?.message);
      this.getVehiclesOfOwner();
      this.editButtonClicked = false;
      this.editVehicleForm.reset();
    }, (error: any) => {
      this.toastr.error(error?.error?.error);
    }
    )
  }

  open(content:any, vehicle: any) {
    this.deletedVehicle = vehicle;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  seeMaintenance(vehicle: any){
    this.maintenanceButtonClicked = true;
    this.selectedVehicle = vehicle;
  }
}
