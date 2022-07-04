import { Component, OnInit } from '@angular/core';
import {CompanyInfo, JobTitle, Workplace} from "../../interfaces/user";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-other-data',
  templateUrl: './other-data.component.html',
  styleUrls: ['./other-data.component.css']
})
export class OtherDataComponent implements OnInit {

  companyInfo: CompanyInfo
  jobTitles:JobTitle[] = []
  workplaces:Workplace[] = []
  displayedColumns: string[] = ['name', 'action'];

  constructor(private backendService: BackendService) {

    this.backendService.getCompanyInfo().subscribe(
      value => {
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

  deleteJobTitle(Id: number) {

  }
}
