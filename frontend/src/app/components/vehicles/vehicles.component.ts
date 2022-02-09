import { Component, OnInit, TemplateRef } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { IVehicles } from './vehicles';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  public vehicles = <IVehicles[]>[];
  modalRef?: BsModalRef;
  public modalTitle = '';
  public btnTitle = '';
  public selectedVehicle = <IVehicles>{};

  public name = new FormControl('', Validators.required);
  public year = new FormControl('', Validators.required);
  public model = new FormControl('',Validators.required);
  public make = new FormControl('',Validators.required);
  public avg = new FormControl('',Validators.required);
  public photo = new FormControl('',Validators.required);

  public showErrors = false;

  constructor(private service: VehiclesService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getList();
  }

  openModal(template: TemplateRef<any>, vehicle?: IVehicles) {
    if(vehicle){
      this.modalTitle = 'Edit Vehicle';
      this.btnTitle = 'Update';
      this.selectedVehicle = vehicle;
      this.name.setValue(vehicle.name);
      this.year.setValue(vehicle.year);
      this.model.setValue(vehicle.model);
      this.make.setValue(vehicle.make);
      this.avg.setValue(vehicle.avg);
      this.photo.setValue(vehicle.photo);
    }else{
      this.modalTitle = 'Add Vehicle';
      this.btnTitle = 'Save';
      this.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  getList(){
    this.service.list().subscribe((res) => {
      this.vehicles = res;     
    });
    
  }

  delete(vehicle: IVehicles){
    this.service.deleteVehicle(vehicle).subscribe((res) => this.getList(),(err) => {
      console.log(err);
    });
  }

  save(){

    if (!this.name.value || !this.year.value || !this.model.value 
      || !this.avg.value || !this.photo.value || !this.make.value || !this.avg.value){
        this.showErrors = true;
        return;
      }


    this.selectedVehicle.name = this.name.value;
    let date = new Date(this.year.value).getFullYear();
    this.selectedVehicle.year = `${date}`;
    this.selectedVehicle.model = this.model.value;
    this.selectedVehicle.avg = this.avg.value;
    this.selectedVehicle.photo = this.photo.value;
    this.selectedVehicle.make = this.make.value;

    if(this.btnTitle == 'Update'){
      this.service.updateVehicle(this.selectedVehicle)
      .subscribe((res) => {
        this.getList();
        this.reset();
        this.showErrors = false;
        this.modalRef?.hide();
      })
    }else{
      this.service.addVehicle(this.selectedVehicle)
        .subscribe((res) => {
          this.getList();
          this.reset();
          this.showErrors = false;
          this.modalRef?.hide();
        })
    }
  }

  reset(){
    this.name.reset();
    this.year.reset();
    this.model.reset();
    this.make.reset();
    this.avg.reset();
    this.photo.reset();
  }

}
