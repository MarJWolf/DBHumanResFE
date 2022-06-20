import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthenticationService, private router:Router, private userService:UserService) { }

  ngOnInit(): void {
  }

  isLogged() {
    return this.authService.getLoggedUser() != undefined;
  }

  isAdmin(){
    return this.userService.isAdmin()
  }

  isManager(){
    return this.userService.isManager()
  }

  onLogOut(){
    this.authService.logOut();
    this.router.navigate(["login"])
  }
}
