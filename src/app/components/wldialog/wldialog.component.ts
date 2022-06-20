import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WLtableComponent} from "../wltable/wltable.component";
import {Status, Type, Workleave} from "../../interfaces/workleave";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-wldialog',
  templateUrl: './wldialog.component.html',
  styleUrls: ['./wldialog.component.css']
})
export class WldialogComponent implements OnInit {

  typeEnum = Type;
  typeKeys = Object.entries(this.typeEnum);
  statusEnum = Status;
  statusKeys = Object.entries(this.statusEnum);
  fillDateFC = new FormControl("", [Validators.required]);
  startDateFC = new FormControl("", [Validators.required]);
  endDateFC = new FormControl("", [Validators.required]);
  typeFC = new FormControl("", [Validators.required]);
  statusManagerFC = new FormControl("Pending")
  statusAdminFC = new FormControl("Pending")

  workleaveForm = new FormGroup({
    fillDate: this.fillDateFC,
    startDate: this.startDateFC,
    endDate: this.endDateFC,
    type: this.typeFC,
    statusManager: this.statusManagerFC,
    statusAdmin: this.statusAdminFC
  })

  constructor(private userService:UserService,
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<WLtableComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { workleave: Workleave },
  ) {
    if(data){
      this.fillDateFC.setValue(data.workleave.fillDate);
      this.startDateFC.setValue(data.workleave.startDate);
      this.endDateFC.setValue(data.workleave.endDate);
      this.typeFC.setValue(data.workleave.type);
      this.statusManagerFC.setValue(data.workleave.statusManager);
      this.statusAdminFC.setValue(data.workleave.statusAdmin);
    }
  }

  myFilter = (d: any): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    if(this.workleaveForm.valid) {
      const fillDate: Date = this.fillDateFC.value;
      const startDate: Date = this.startDateFC.value;
      const endDate: Date = this.endDateFC.value;
      if (this.data) {
        const finalWorkleave = {
          ...this.data.workleave,
          type: this.workleaveForm.value.type,
          fillDate: fillDate.toLocaleDateString(),
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString(),
          statusManager: this.workleaveForm.value.statusManager,
          statusAdmin: this.workleaveForm.value.statusAdmin
        };
        this.userService.updateWorkleave(finalWorkleave).subscribe();
      } else {
        const finalWorkleave = {
          userId: this.authService.getLoggedUser()?.userID,
          type: this.workleaveForm.value.type,
          fillDate: fillDate.toLocaleDateString(),
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString(),
          statusManager: Status.Pending,
          statusAdmin: Status.Pending
        };
        this.userService.createWorkleave(finalWorkleave).subscribe();
      }
    }
  }

  ngOnInit(): void {
  }

  isAdmin(){
    return this.userService.isAdmin()
  }

  isManager(){
    return this.userService.isManager()
  }
}
