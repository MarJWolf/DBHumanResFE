import {Component, OnInit} from '@angular/core';
import {Workleave} from "../../interfaces/workleave";
import {BackendService} from "../../services/backend.service";
import {MatDialog} from "@angular/material/dialog";
import {User, UserSimp} from "../../interfaces/user";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-all-workleaves',
  templateUrl: './all-workleaves.component.html',
  styleUrls: ['./all-workleaves.component.css']
})
export class AllWorkleavesComponent implements OnInit {

  user?: User
  workleaves: Workleave[] =[]

  allUsers?: UserSimp[];

  constructor(private backendService: BackendService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let userInfo = this.backendService.getLoggedInUser();
    if (userInfo) {
      userInfo.subscribe(value => {
          this.user = value;
          this.getWorkleaves();
        });
      this.backendService.getAllUsers().subscribe(value => this.allUsers = value)
    }
  }

  public getWorkleaves(selectedUserId?:number,event? : PageEvent) {
    let workleaveInfo = this.backendService.getAllWorkleaves(selectedUserId);

    if (this.user && this.backendService.isManager()) {
      workleaveInfo = this.backendService.getSubWorkleaves(this.user.id);
    }
    if (workleaveInfo)
      workleaveInfo.subscribe(
        value1 => {
          this.workleaves = value1;
        }
      );
  }
}
