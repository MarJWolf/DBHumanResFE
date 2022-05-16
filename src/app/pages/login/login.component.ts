import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users?:User[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let response= this.http.get<User[]>("http://localhost:8080/users/all");
    response.subscribe((data)=>this.users=data)
  }

}
