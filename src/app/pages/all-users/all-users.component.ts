import {Component, OnInit } from '@angular/core';
import {User, UserSimp} from "../../interfaces/user";
import {BackendService} from "../../services/backend.service";
import {MatDialog} from "@angular/material/dialog";
import {UdialogComponent} from "../../components/udialog/udialog.component";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  user?: User
  users?: UserSimp[];
  displayedColumns: string[] = ['email', 'name', 'role', 'action'];

  constructor(private backendService: BackendService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let userInfo = this.backendService.getLoggedInUser();
    let usersInfo = this.backendService.getAllUsers();
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

  openDialogNew(): void {
    this.dialog.open(UdialogComponent, {
      width: 'clamp(300px,50%,500px)',
    });
  }

}
