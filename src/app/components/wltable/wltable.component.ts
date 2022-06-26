import {Component, Input, OnInit} from '@angular/core';
import {Workleave} from "../../interfaces/workleave";
import {BackendService} from "../../services/backend.service";
import {WldialogComponent} from "../wldialog/wldialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-wltable',
  templateUrl: './wltable.component.html',
  styleUrls: ['./wltable.component.css']
})
export class WLtableComponent implements OnInit {
  @Input()
  workleaves?: Workleave[]
  displayedColumns: string[] = ['startDate', 'endDate', 'fillDate', 'statusManager', 'statusAdmin', 'actions']
  @Input()
  hasUsername?: boolean
  @Input()
  toEdit?: boolean

  constructor(private backendService: BackendService, public dialog: MatDialog, private authService: AuthenticationService) {
  }

  isAdmin() {
    return this.backendService.isAdmin()
  }

  isManager() {
    return this.backendService.isManager()
  }

  isUser(){
    return this.backendService.isUser()
  }

  accept(workleaveId: number) {
    this.backendService.changeStatus(workleaveId, "Confirmed").subscribe()
  }

  deny(workleaveId: number) {
    this.backendService.changeStatus(workleaveId, "Denied").subscribe()
  }

  cancel(workleaveId: number) {
    this.backendService.cancelWorkleave(workleaveId, "Cancelled").subscribe()
  }

  openDialog(workleave: Workleave): void {
    this.dialog.open(WldialogComponent, {
      width: 'clamp(300px,50%,500px)',
      data: {workleave: workleave},
    });
  }

  ngOnInit(): void {
    this.displayedColumns = this.hasUsername ? ['userName', ...this.displayedColumns] : this.displayedColumns;
  }

  canCancel(workleave: Workleave): boolean{
    return ((workleave.statusAdmin.toString() == "Pending" || workleave.statusManager.toString() == "Pending") && workleave.userId == this.authService.getLoggedUser()?.userID);
  }
}
