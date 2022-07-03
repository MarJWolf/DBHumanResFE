import {Component, Inject, OnInit} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WLtableComponent} from "../wltable/wltable.component";
import {Manager, Role, User} from "../../interfaces/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-udialog',
  templateUrl: './udialog.component.html',
  styleUrls: ['./udialog.component.css']
})
export class UdialogComponent implements OnInit {
  emailFC = new FormControl("", [Validators.required, Validators.email]);
  passFC = new FormControl("", [Validators.required, Validators.minLength(6)]);
  nameFC = new FormControl("", [Validators.required]);
  jobFC = new FormControl("", [Validators.required]);
  placeFC = new FormControl("", [Validators.required]);
  daysFC = new FormControl("", [Validators.required, Validators.min(0)]);
  roleFC = new FormControl("", [Validators.required]);
  managerFC = new FormControl("");

  managerKeys:Manager[] = []
  roleKeys = Object.entries(Role);

  userForm = new FormGroup({
    email: this.emailFC,
    pass: this.passFC,
    fullName: this.nameFC,
    jobTitle: this.jobFC,
    workplace: this.placeFC,
    paidDays: this.daysFC,
    role: this.roleFC,
    managerId: this.managerFC
  })

  constructor(private backendService:BackendService,
              private authService:AuthenticationService,
              public dialogRef: MatDialogRef<WLtableComponent>,
              @Inject(MAT_DIALOG_DATA) public data?: { user: User }) {
    this.managerKeys = [{Id: null, name: "Няма мениджър"}];
    if (data) {
      this.emailFC.setValue(data.user.email)
      this.passFC.setValue(data.user.pass)
      this.nameFC.setValue(data.user.fullName)
      this.jobFC.setValue(data.user.jobTitleId)
      this.placeFC.setValue(data.user.workplaceId)
      this.daysFC.setValue(data.user.thisYearPaidDays)
      this.roleFC.setValue(data.user.role)
      this.backendService.getManagerNames().subscribe(
        value => {
          this.managerKeys.push(...value)
          if(data.user.managerId != null){
            this.managerFC.setValue(this.managerKeys.find(value1 => value1.Id == data.user.managerId))
          }else{
            this.managerFC.setValue(this.managerKeys[0])
          }

        }
      )
    }
    else{
      this.managerFC.setValue(this.managerKeys[0])
    }

    if((data?.user.id == authService.getLoggedUser()?.userID) && !this.isAdmin()){
      this.emailFC.disable();
      this.nameFC.disable();
      this.jobFC.disable();
      this.placeFC.disable();
      this.daysFC.disable();
      this.roleFC.disable();
      this.managerFC.disable();
    }
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void{
    if(this.userForm.valid) {
      const managerId: number = this.managerFC.value.Id
      const tempUser = {
        email: this.emailFC.value,
        pass: this.passFC.value,
        fullName: this.nameFC.value,
        jobTitleId: this.jobFC.value,
        workplaceId: this.placeFC.value,
        thisYearPaidDays: this.daysFC.value,
        role: this.roleFC.value,
        managerId
      }
      if(this.data){
        const finalUser: User = {
          id: this.data.user.id,
          ...tempUser
        }
        this.backendService.updateUser(finalUser).subscribe();
      }
      else{
        this.backendService.createUser(tempUser).subscribe();
      }
      this.dialogRef.close();
    }else{
      this.userForm.markAllAsTouched()
    }
  }

  isAdmin(){
    return this.backendService.isAdmin()
  }
}
