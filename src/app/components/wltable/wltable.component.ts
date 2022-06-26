import {Component, Input, OnInit} from '@angular/core';
import {Workleave} from "../../interfaces/workleave";
import {BackendService} from "../../services/backend.service";
import {WldialogComponent} from "../wldialog/wldialog.component";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private backendService: BackendService, public dialog: MatDialog) {
  }

  isAdmin() {
    return this.backendService.isAdmin()
  }

  isManager() {
    return this.backendService.isManager()
  }

  accept(workleaveId: number) {
    this.backendService.changeStatus(workleaveId, "Confirmed").subscribe()
  }

  deny(workleaveId: number) {
    this.backendService.changeStatus(workleaveId, "Denied").subscribe()
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

}
