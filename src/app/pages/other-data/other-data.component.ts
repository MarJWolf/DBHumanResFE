import { Component, OnInit } from '@angular/core';
import {CompanyInfo, JobTitle, Workplace} from "../../interfaces/user";
import {BackendService} from "../../services/backend.service";
import {SimpleDialogComponent} from "../../components/simple-dialog/simple-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NameDialogComponent} from "../../components/name-dialog/name-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-other-data',
  templateUrl: './other-data.component.html',
  styleUrls: ['./other-data.component.css']
})
export class OtherDataComponent implements OnInit {

  companyInfo?: CompanyInfo
  jobTitles:JobTitle[] = []
  workplaces:Workplace[] = []
  displayedColumns: string[] = ['name', 'action'];

  nameFC = new FormControl("",[Validators.required])
  CEOnameFC = new FormControl("",[Validators.required])

  companyInfoForm = new FormGroup({
   Cname: this.nameFC,
   Oname: this.CEOnameFC
  })

  constructor(private backendService: BackendService, public dialog: MatDialog) {

    this.backendService.getCompanyInfo().subscribe(
      value => {
        this.nameFC.setValue( value.companyName);
        this.CEOnameFC.setValue( value.companyCEOName);
        this.companyInfo = value;
      })
    this.backendService.getAllWorkplaces().subscribe(
      value => {
        this.workplaces = value;
      })
    this.backendService.getAllJobTitles().subscribe(
      value => {
       this.jobTitles = value;
      })
  }

  ngOnInit(): void {

  }

  submitCompanyData(){
    this.dialog.open(SimpleDialogComponent, {
      width: 'clamp(300px,50%,500px)',
      data: {text: "Сигурни ли сте че искате да промените информацията на фирмата?", setResult: (result:boolean) => {
          if (result) {
            if(this.companyInfoForm.valid) {
              this.backendService.updateCompanyInfo(this.nameFC.value, this.CEOnameFC.value).subscribe();
            }else{
              this.companyInfoForm.markAllAsTouched();
            }
          }
        }}
    });
  }

  createWorkplace(){
    this.dialog.open(NameDialogComponent, {
      width: 'clamp(300px,50%,500px)',
      data: {type: true}
    });
  }

  createJobTitle(){
    this.dialog.open(NameDialogComponent, {
      width: 'clamp(300px,50%,500px)',
      data: {type: false}
    });
  }

  deleteJobTitle(Id: number) {
    this.dialog.open(SimpleDialogComponent, {
      width: 'clamp(300px,50%,500px)',
      data: {text: "Сигурни ли сте че искате да изтриете тази длъжност?", setResult: (result:boolean) => {
          if (result) {
            this.backendService.deleteJobTitle(Id).subscribe();
          }
        }}
    });
  }

  deleteWorkplace(Id: number) {
    this.dialog.open(SimpleDialogComponent, {
      width: 'clamp(300px,50%,500px)',
      data: {text: "Сигурни ли сте че искате да изтриете тази месторабота?", setResult: (result:boolean) => {
          if (result) {
            this.backendService.deleteWorkplace(Id).subscribe();
          }
        }}
    });
  }
}
