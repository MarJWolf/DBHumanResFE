import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WLtableComponent} from "../wltable/wltable.component";
import {allStatus, statusTranslation, Type, Workleave} from "../../interfaces/workleave";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../../services/backend.service";
import {AuthenticationService} from "../../services/authentication.service";
import {DateAdapter} from "@angular/material/core";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-wldialog',
  templateUrl: './wldialog.component.html',
  styleUrls: ['./wldialog.component.css']
})
export class WldialogComponent implements OnInit {

  typeKeys = Object.entries(Type);
  statusKeys = allStatus.map(value => ({value: value,translation: statusTranslation[value]}))
  fillDateFC = new FormControl("", [Validators.required]);
  startDateFC = new FormControl("", [Validators.required]);
  endDateFC = new FormControl("", [Validators.required]);
  typeFC = new FormControl("", [Validators.required]);
  statusManagerFC = new FormControl("Pending")
  statusAdminFC = new FormControl("Pending")

  workleaveForm = new FormGroup({
    startDate: this.startDateFC,
    endDate: this.endDateFC,
    type: this.typeFC,
    statusManager: this.statusManagerFC,
    statusAdmin: this.statusAdminFC
  })

  constructor(private backendService: BackendService,
              private authService: AuthenticationService,
              public dialogRef: MatDialogRef<WLtableComponent>,
              private _adapter: DateAdapter<any>,
              @Inject(MAT_DIALOG_DATA) public data?: { workleave: Workleave },
  ) {
    this._adapter.setLocale("bg-BG")
    if (data) {
      this.fillDateFC.setValue(new Date(data.workleave.fillDate));
      this.startDateFC.setValue(new Date(data.workleave.startDate));
      this.endDateFC.setValue(new Date(data.workleave.endDate));
      this.typeFC.setValue(data.workleave.type);
      this.statusManagerFC.setValue(data.workleave.statusManager);
      this.statusAdminFC.setValue(data.workleave.statusAdmin);
    }
  }

  myStartFilter = (d: any): boolean => {
    const day = (d || new Date());
    const dayOfWeek = (d || new Date()).getDay()
    return dayOfWeek !== 0 && dayOfWeek !== 6 && day > new Date();
  };

  myEndFilter = (d: any): boolean => {
    const day = (d || new Date());
    const dayOfWeek = (d || new Date()).getDay()
    return dayOfWeek !== 0 && dayOfWeek !== 6 && day >= this.startDateFC.value;
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    if (this.workleaveForm.valid) {
      const startDate: Date = this.startDateFC.value;
      const endDate: Date = this.endDateFC.value;
      startDate.setHours(12)
      endDate.setHours(12)
      const type = this.workleaveForm.value.type;
      if (this.data) {
        const fillDate: Date = this.fillDateFC.value;
        const finalWorkleave = {
          ...this.data.workleave,
          type,
          fillDate,
          startDate,
          endDate,
          statusManager: this.workleaveForm.value.statusManager,
          statusAdmin: this.workleaveForm.value.statusAdmin
        };
        this.backendService.updateWorkleave(finalWorkleave).subscribe(
          () => {
            location.reload();
            this.dialogRef.close();
          }
        );
      } else {
        const fillDate = new Date();
        const finalWorkleave = {
          userId: this.authService.getLoggedUser()?.userID,
          type,
          fillDate,
          startDate,
          endDate,
          statusManager: "Pending",
          statusAdmin: "Pending"
        };
        this.backendService.createWorkleave(finalWorkleave).subscribe({
            next: () => {
              location.reload();
              this.dialogRef.close();
            },
            error: (err:HttpErrorResponse) => {
              alert(JSON.stringify(err.error));
            }
          }
        );
      }

    } else {
      this.workleaveForm.markAllAsTouched()
    }
  }

  ngOnInit(): void {
  }

  isMine(userID: number){
    return this.authService.getLoggedUser()?.userID == userID
  }

  isAdmin() {
    return this.backendService.isAdmin()
  }

  isManager() {
    return this.backendService.isManager()
  }
}
