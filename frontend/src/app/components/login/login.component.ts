import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean = false;
  error: any;
  constructor(private http: HttpClient, private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {

    this.auth.status().subscribe((res) => {
      this.loggedIn = res;

    }, (err) => {
      console.log(err);

    });

    if (this.loggedIn == true) {
      this.router.navigate(['/dashboard']);
    }

  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    this.auth.login(email, password).subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res))

      this.router.navigate(['/dashboard']);
    }, (err) => {
      this.error = err.error.error;
    });

  }

}
