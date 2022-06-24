import { Component, OnInit } from '@angular/core';
import {User, UserSimp} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
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

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let userInfo = this.userService.getLoggedInUser();
    let usersInfo = this.userService.getAllInactiveUsers();
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
