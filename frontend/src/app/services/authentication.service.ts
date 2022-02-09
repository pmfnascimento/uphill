import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  // Toggle Login
  toggleLogin(state:boolean): void{
    this.isLoggedIn.next(state);
  }

  status(){
    const localData:any = localStorage.getItem('user');

    if(!localData){
      this.isLoggedIn.next(false);
      console.log('User is not logged in!');
    }else{
      const userObj: any = JSON.parse(localData);
      const updated_at = new Date(userObj.expires_at);
      const currentDate = new Date();
      console.log(updated_at);
      console.log(currentDate);

      if (updated_at > currentDate) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
        console.log('Token Expires!');
      }

    }
   
    return this.isLoggedIn.asObservable();
  }

  // Login Function
  login(email: string, password: string) {
    return this.http.post('http://localhost:8000/api/login', {
      email: email,
      password: password
    });
  }

  //Users Info
  userInfo() {
    const localData: any = localStorage.getItem('user');
    const userObj: any = JSON.parse(localData);

    const token: any = userObj.token;
    const headers: any = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.http.get('http://localhost:8000/api/user', { headers: headers });
  }

  // Logout
  logout(){
    
    const localData: any = localStorage.getItem('user');
    const userObj: any = JSON.parse(localData);

    const token: any = userObj.token;
    const headers: any = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    localStorage.removeItem('user');
   
    return this.http.post('http://localhost:8000/api/logout', { headers: headers });
   
  }
}
