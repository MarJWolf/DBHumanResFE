import {Component, Inject, OnInit} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WLtableComponent} from "../wltable/wltable.component";
import {Days, JobTitle, Manager, Role, User, Workplace} from "../../interfaces/user";
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
  jobFC = new FormControl("");
  placeFC = new FormControl("");
  CdaysFC = new FormControl("", [Validators.required, Validators.min(0)]);
  roleFC = new FormControl("", [Validators.required]);
  managerFC = new FormControl("");

  managerKeys: Manager[] = []
  roleKeys = Object.entries(Role);
  jobTitleKeys: JobTitle[] = []
  workplaceKeys: Workplace[] = []
  days?: Days[] = []

  setDays = (days?: Days[]) => {
    this.days = days?.sort((a: Days, b: Days) =>
      b.year - a.year);
  }

  displayedColumns: string[] = ['paidDays', 'year', 'use', 'actions']

  userForm = new FormGroup({
    email: this.emailFC,
    pass: this.passFC,
    fullName: this.nameFC,
    jobTitleId: this.jobFC,
    workplaceId: this.placeFC,
    contractPaidDays: this.CdaysFC,
    role: this.roleFC,
    managerId: this.managerFC
  })

  daysFC = new FormControl("", [Validators.required, Validators.min(0), Validators.max(this.CdaysFC.value)])
  yearFC = new FormControl("", [Validators.required]);
  isUsable = new FormControl("");

  daysForm = new FormGroup({daysFC: this.daysFC, yearFC: this.yearFC, isUsable: this.isUsable})


  showNewDaysFields = false;
  toggleAdd = () => {
    this.showNewDaysFields = !this.showNewDaysFields;
  }
  years: number[] = Array.from({length: 50}, (_, i) => (new Date()).getFullYear() - i);
  onCheckboxChange = (isChecked: boolean, id: number) => {
    this.days?.map((value) => {
      if (value.id == id) {
        value.use = isChecked
      }
    })
  };

  constructor(private backendService: BackendService,
              private authService: AuthenticationService,
              public dialogRef: MatDialogRef<WLtableComponent>,
              @Inject(MAT_DIALOG_DATA) public data?: { user: User }) {
    this.managerKeys = [{id: null, name: "Няма мениджър"}];
    this.jobTitleKeys = [{id: null, jobTitle: "Освободен"}];

    this.backendService.getAllJobTitles().subscribe(value => {
      this.jobTitleKeys.push(...value)
      if (data && data.user.jobTitleId != null) {
        const jobTitle = this.jobTitleKeys.find(value1 => value1.id == data.user.jobTitleId);
        this.jobFC.setValue(jobTitle)
      } else {
        this.jobFC.setValue(this.jobTitleKeys[0])
      }
    });

    this.backendService.getAllWorkplaces().subscribe(value => {
      this.workplaceKeys = value;
      if (data && data.user.workplaceId != null) {
        const workplace = this.workplaceKeys.find(value1 => value1.id == data.user.workplaceId);
        this.placeFC.setValue(workplace)
      } else {
        this.placeFC.setValue(this.workplaceKeys[0])
      }
    });

    this.backendService.getManagerNames().subscribe(value => {
      this.managerKeys.push(...value)
      if (data && data.user.managerId != null) {
        const manager = this.managerKeys.find(value1 => value1.id == data.user.managerId);
        this.managerFC.setValue(manager)
      } else {
        this.managerFC.setValue(this.managerKeys[0])
      }
    });

    if (data) {
      this.emailFC.setValue(data.user.email)
      this.passFC.setValue(data.user.pass)
      this.nameFC.setValue(data.user.fullName)
      this.CdaysFC.setValue(data.user.contractPaidDays)
      this.roleFC.setValue(data.user.role)
      this.setDays(data.user.allDays)
    }

    if ((data?.user.id == authService.getLoggedUser()?.userID) && !this.isAdmin()) {
      this.emailFC.disable();
      this.nameFC.disable();
      this.jobFC.disable();
      this.placeFC.disable();
      this.CdaysFC.disable();
      this.roleFC.disable();
      this.managerFC.disable();
    }
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    if (this.userForm.valid) {
      const tempUser = {
        email: this.emailFC.value,
        pass: this.passFC.value,
        fullName: this.nameFC.value,
        jobTitleId: this.jobFC.value.id,
        workplaceId: this.placeFC.value.id,
        contractPaidDays: this.CdaysFC.value,
        role: this.roleFC.value,
        managerId: this.managerFC.value.id,
        days: this.days
      }

      if (this.data) {
        const finalUser: User = {
          id: this.data.user.id,
          ...tempUser
        }
        this.backendService.updateUser(finalUser).subscribe(
          () => {
            location.reload();
          }
        );
      } else {
        this.backendService.createUser(tempUser).subscribe(
          () => {
            location.reload();
          }
        );
      }
      this.dialogRef.close();
    } else {
      this.userForm.markAllAsTouched()
    }
  }

  isAdmin() {
    return this.backendService.isAdmin()
  }

  saveNewDays() {
    if (this.daysForm.valid && this.data?.user) {
      const formDays: Days = {
        userDaysId: this.data.user.id,
        days: Number(this.daysFC.value),
        year: Number(this.yearFC.value),
        use: this.isUsable.value
      }
      this.backendService.saveDays(formDays).subscribe((value: Days[]) => {
          this.setDays(value)
        }
      )
    }

  }

  deleteDays(Id: number) {
    this.backendService.deleteDays(Id).subscribe(() => {
      if (this.data) {
        this.backendService.getDaysByUserId(this.data.user.id).subscribe(
          (value) => {
            this.setDays(value)
          }
        )
      }
    });
  }

}
