import {Component, OnInit} from '@angular/core';
import {Workleave} from "../../interfaces/workleave";
import {BackendService} from "../../services/backend.service";
import {MatDialog} from "@angular/material/dialog";
import {User, UserSimp} from "../../interfaces/user";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup} from "@angular/forms";
import {WldialogComponent} from "../../components/wldialog/wldialog.component";

@Component({
  selector: 'app-all-workleaves',
  templateUrl: './all-workleaves.component.html',
  styleUrls: ['./all-workleaves.component.css']
})
export class AllWorkleavesComponent implements OnInit {

  user?: User
  workleaves: Workleave[] = []

  allUsers?: UserSimp[];
  startDateFC = new FormControl();
  endDateFC = new FormControl();
  userIdFC = new FormControl();

  filter = new FormGroup({start: this.startDateFC, end: this.endDateFC, userId: this.userIdFC})


  constructor(private backendService: BackendService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    let userInfo = this.backendService.getLoggedInUser();
    if (userInfo) {
      userInfo.subscribe(value => {
        this.user = value;
        this.getWorkleaves();
      });
      this.backendService.getAllUsers().subscribe(value => this.allUsers = value)
    }
    this.filter.valueChanges.subscribe(value => {
        if (this.filter.valid)
          this.getWorkleaves(value.userId, value.start, value.end)
      }
    )
  }

  public createWorkleave() {
    this.dialog.open(WldialogComponent, {
      width: 'clamp(300px,50%,500px)',
      data: {isUserCustomizable: true}
    });
  };

  public getWorkleaves(selectedUserId?: number, start?: Date, end?: Date, event?: PageEvent) {
    let workleaveInfo = this.backendService.getAllWorkleaves(selectedUserId, start, end);

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


  isAdmin() {
    return this.backendService.isAdmin()
  }

}
