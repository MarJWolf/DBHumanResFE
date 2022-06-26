import { Component, OnInit } from '@angular/core';
import {Workleave} from "../../interfaces/workleave";
import {BackendService} from "../../services/backend.service";
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

  constructor(private backendService: BackendService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let userInfo = this.backendService.getLoggedInUser();
    if (userInfo) {
      userInfo.subscribe(value => {
        this.user = value;
        let workleaveInfo = this.backendService.getAllWorkleaves();
        if(this.backendService.isManager()){
          workleaveInfo = this.backendService.getSubWorkleaves(this.user.id);
        }
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
