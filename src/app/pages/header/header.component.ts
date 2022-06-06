import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  isLogged() {
    return this.authService.getLoggedUser() != undefined;
  }

  isHR(){
    return this.authService.getLoggedUser()!.userRole.includes("HR");
  }

  isM(){
    return this.authService.getLoggedUser()!.userRole.includes("Manager");
  }
}
