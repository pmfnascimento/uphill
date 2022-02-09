import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public router: string = '';
  user: any = {};
  loggedIn: boolean = false;
  constructor(private _router: Router, private auth: AuthenticationService) {
    this.router = _router.url;    
  }

  ngOnInit(): void {
    this.auth.status().subscribe((res) => {
      this.loggedIn = res;

    }, (err) => {
      console.log(err);

    });

    if (this.loggedIn == true) {
      this.auth.userInfo().subscribe((res) => {
        this.user = res;
      })
    }

  }


  logout() {
    this.auth.logout();
    this._router.navigate(['/login']);
  }

}
