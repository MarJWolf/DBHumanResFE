import { Component, OnInit } from '@angular/core';
import {Workleave} from "../../interfaces/workleave";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-all-workleaves',
  templateUrl: './all-workleaves.component.html',
  styleUrls: ['./all-workleaves.component.css']
})
export class AllWorkleavesComponent implements OnInit {

  user?: User
  workleaves: Workleave[] =[]

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let userInfo = this.userService.getLoggedInUser();
    let workleaveInfo = this.userService.getAllWorkleaves();
    if (userInfo) {
      userInfo.subscribe(value => {
          this.user = value;
          if (workleaveInfo)
            workleaveInfo.subscribe(
              value1 => {
                this.workleaves = value1;
              }
            );
        }
      );
    }
  }
}
