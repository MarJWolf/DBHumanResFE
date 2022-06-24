import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WLtableComponent} from "../wltable/wltable.component";
import {User} from "../../interfaces/user";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-udialog',
  templateUrl: './udialog.component.html',
  styleUrls: ['./udialog.component.css']
})
export class UdialogComponent implements OnInit {
  emailFC = new FormControl("", [Validators.required, Validators.email]);
  passFC = new FormControl("", [Validators.required]);
  jobFC = new FormControl("", [Validators.required]);
  placeFC = new FormControl("", [Validators.required]);
  daysFC = new FormControl("", [Validators.required, Validators.min(0)]);
  roleFC = new FormControl("", [Validators.required]);

  roleKeys = ["Admin","User","Manager"]

  constructor(private userService:UserService,
              private authService: AuthenticationService,
              public dialogRef: MatDialogRef<WLtableComponent>,
              @Inject(MAT_DIALOG_DATA) public data?: { user: User }) {
    if(data){
      this.emailFC.setValue(data.user.email)
      this.passFC.setValue(data.user.pass)
      this.jobFC.setValue(data.user.jobTitle)
      this.placeFC.setValue(data.user.workplace)
      this.daysFC.setValue(data.user.paidDays)
      this.roleFC.setValue(data.user.role)
    }
  }

  ngOnInit(): void {
  }

}
