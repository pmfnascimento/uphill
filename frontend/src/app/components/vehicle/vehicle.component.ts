import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { IVehicles } from '../vehicles/vehicles';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  public vehicles = <IVehicles[]>[];

  constructor(private service: VehiclesService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.list().subscribe((res) => {
      this.vehicles = res;
    });

  }

}
