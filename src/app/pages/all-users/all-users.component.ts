import {Component, OnInit } from '@angular/core';
import {User, UserSimp} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  user?: User
  users?: UserSimp[];
  displayedColumns: string[] = ['email', 'name', 'role', 'action'];

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let userInfo = this.userService.getLoggedInUser();
    let usersInfo = this.userService.getAllUsers();
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
