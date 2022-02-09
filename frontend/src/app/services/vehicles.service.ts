import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVehicles } from '../components/vehicles/vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private url: string = 'http://localhost:8000/api/vehicles';
  constructor(private http:HttpClient) { }

  list(): Observable<IVehicles[]>{
    
    return this.http.get<IVehicles[]>(this.url);
  }

  getVehicle(id: number):Observable<IVehicles[]> {
  
    return this.http.get<IVehicles[]>(this.url + '/' + id);
  }

  addVehicle(vehicle: IVehicles): Observable<IVehicles[]>{
    const localData: any = localStorage.getItem('user');
    const userObj: any = JSON.parse(localData);

    const token: any = userObj.token;
    const headers: any = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<IVehicles[]>(this.url,vehicle, { headers: headers });
  }

  updateVehicle(vehicle: IVehicles): Observable<IVehicles[]> {
    const localData: any = localStorage.getItem('user');
    const userObj: any = JSON.parse(localData);

    const token: any = userObj.token;
    const headers: any = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<IVehicles[]>(this.url + '/' + vehicle.id, vehicle, { headers: headers });
  }

  deleteVehicle(vehicle: IVehicles): Observable<Boolean> {
    const localData: any = localStorage.getItem('user');
    const userObj: any = JSON.parse(localData);

    const token: any = userObj.token;
    const headers: any = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<Boolean>(this.url + '/'+ vehicle.id, { headers: headers });
  }
}
