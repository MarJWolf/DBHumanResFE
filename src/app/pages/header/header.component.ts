import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {BackendService} from "../../services/backend.service";
import {UdialogComponent} from "../../components/udialog/udialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthenticationService, public router:Router, private backendService:BackendService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.backendService.getById(this.authService.getLoggedUser()?.userID!).subscribe(value => {
      this.dialog.open(UdialogComponent, {
        width: 'clamp(300px,50%,500px)',
        data: {user : value}
      });
    });
  }
  isLogged() {
    return this.authService.getLoggedUser() != undefined;
  }

  isAdmin(){
    return this.backendService.isAdmin()
  }

  isManager(){
    return this.backendService.isManager()
  }

  onLogOut(){
    this.authService.logOut();
    this.router.navigate(["login"]);
  }

}
