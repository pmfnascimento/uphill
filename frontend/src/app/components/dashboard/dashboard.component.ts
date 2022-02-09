import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = {};
  loggedIn: boolean = false;
  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    
    this.auth.status().subscribe((res) => {
      this.loggedIn = res;
            
    }, (err) => {
      console.log(err);

    });
    
    if(this.loggedIn == true){
      this.auth.userInfo().subscribe((res) => {
        this.user = res;
      })
    }else{
      this.router.navigate(['/login']);
    }
 
  }



}
