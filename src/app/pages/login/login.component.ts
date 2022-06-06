import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {UserS} from "../../interfaces/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  error = " ";
  // users?:User[];
  pass = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private http:HttpClient, private router:Router, private authService:AuthenticationService) { }

  ngOnInit(): void {
    if(this.authService.getLoggedUser() != undefined){
      this.router.navigate(["home"])
    }
  }

  onSubmit(): void{
    let body = `username=${this.email.value}&password=${this.pass.value}`;
    let response = this.http.post<UserS>("http://localhost:8080/login", body, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    response.subscribe( {
      next : (result) => {
        this.authService.LoggedUser = result;
        sessionStorage.setItem("LoggedUser", JSON.stringify(result));
        this.router.navigate(['home'])
      },
    error : (err:HttpErrorResponse) => {
      if(err.status == 401){
        this.error = "Invalid credentials!"
      }
    }});
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
