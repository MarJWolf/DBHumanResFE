import { Component, OnInit } from '@angular/core';
import {User, UserSimp} from "../../interfaces/user";
import {BackendService} from "../../services/backend.service";
import {MatDialog} from "@angular/material/dialog";

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

}
