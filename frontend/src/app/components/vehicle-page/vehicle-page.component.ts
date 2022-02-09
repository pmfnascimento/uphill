import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicle-page',
  templateUrl: './vehicle-page.component.html',
  styleUrls: ['./vehicle-page.component.scss']
})
export class VehiclePageComponent implements OnInit {

  public vehicle: any = [];

  public showResult:boolean = false;
  public cost!: number;
  public distance = new FormControl('',Validators.required);

  constructor(private service: VehiclesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getVehicle();
    this.distance.valueChanges
      .subscribe(query => {
        this.cost = query * this.vehicle.avg;
        this.showResult = true;

        if(!query){
          this.showResult = false;
        }
      });
  }

  getVehicle(){
    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));
    this.service.getVehicle(IdFromRoute).subscribe((res) => this.vehicle = res);
  }
}
