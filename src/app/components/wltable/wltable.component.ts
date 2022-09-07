import 'rxjs';
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
  @Input()
  fetchWorkleaves = () => {};

  constructor(private backendService: BackendService, public dialog: MatDialog, private authService: AuthenticationService) {
  }

  isAdmin() {
    return this.backendService.isAdmin()
  }

  isManager() {
    return this.backendService.isManager()
  }

  isUser() {
    return this.backendService.isUser()
  }

  accept(workleaveId: number) {
    this.backendService.changeStatus(workleaveId, "Confirmed").subscribe(
      () => {
        this.fetchWorkleaves()
      })

  }

  deny(workleaveId: number) {
    this.backendService.changeStatus(workleaveId, "Denied").subscribe(
      () => {
        this.fetchWorkleaves()
      })
  }

  cancel(workleaveId: number) {
    this.backendService.cancelWorkleave(workleaveId, "Cancelled").subscribe(
      () => {
        this.fetchWorkleaves()
      })
  }

  openDialog(workleave: Workleave): void {
    this.dialog.open(WldialogComponent, {
      width: 'clamp(300px,50%,500px)',
      data: {workleave: workleave, isUserCustomizable: false},
    });
  }

  ngOnInit(): void {
    this.displayedColumns = this.hasUsername ? ['userName', ...this.displayedColumns] : this.displayedColumns;
  }

  canCancel(workleave: Workleave): boolean {
    return ((workleave.statusAdmin.toString() == "Pending" || workleave.statusManager.toString() == "Pending") && workleave.userId == this.authService.getLoggedUser()?.userID);
  }

  printDoc(id: number) {
    this.backendService.getWorkleaveDocument(id).subscribe(file => {
      const objectURL = URL.createObjectURL(file);
      window.open(objectURL, '_blank');
    })
  }

  printNewDoc(id: number) {
    this.backendService.getNewWorkleaveDocument(id).subscribe(file => {
      const objectURL = URL.createObjectURL(file);
      window.open(objectURL, '_blank');
    })
  }

  isAfterToday(startDate: Date) {
    const date = new Date(startDate);
    return new Date() < date;
  }
}
