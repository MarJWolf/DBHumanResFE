import { Component, OnInit } from '@angular/core';
import {User, UserSimp} from "../../interfaces/user";
import {BackendService} from "../../services/backend.service";
import {MatDialog} from "@angular/material/dialog";
import {UdialogComponent} from "../../components/udialog/udialog.component";

@Component({
  selector: 'app-all-inactive-users',
  templateUrl: './all-inactive-users.component.html',
  styleUrls: ['./all-inactive-users.component.css']
})
export class AllInactiveUsersComponent implements OnInit {

  user?: User
  users?: UserSimp[];
  displayedColumns: string[] = ['email', 'name', 'role', 'action'];

  constructor(private backendService: BackendService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let userInfo = this.backendService.getLoggedInUser();
    let usersInfo = this.backendService.getAllInactiveUsers();
    if (userInfo) {
      userInfo.subscribe(value => {
          this.user = value;
          if (usersInfo)
            usersInfo.subscribe(
              value1 => {
                this.users = value1;
              }
            );
        }
      );
    }
  }

  openDialog(Id: number): void {
    this.backendService.getById(Id).subscribe(value => {
      this.dialog.open(UdialogComponent, {
        width: 'clamp(300px,50%,500px)',
        data: {user : value}
      });
    });
  }
}
