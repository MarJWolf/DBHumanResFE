import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BackendService} from "../../services/backend.service";
import {Days, User} from "../../interfaces/user";
import {Workleave} from "../../interfaces/workleave";
import {MatDialog} from "@angular/material/dialog";
import {WldialogComponent} from "../../components/wldialog/wldialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user?: User
  subUsersWL: Workleave[] =[]
  adminWL: Workleave[] =[]
  workleaves: Workleave[] =[]
  userDays: Days[] = []
  userJobTitle?: string
  userTotalDays: number = 0

  constructor(private http: HttpClient, public router: Router, private backendService: BackendService,public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.getUserInfo();
  }

  public getUserInfo() {

      this.backendService.getLoggedInUser().subscribe(value => {
          this.user = value;
          this.workleaves = this.user?.allWorkleaves ?? [];
          this.userDays = this.user?.allDays ?? [];
          this.backendService.getJobTitleById(this.user.jobTitleId).subscribe(
            value1 => {
              this.userJobTitle = value1.jobTitle;
            })

          this.userDays.map(days => {
            if (days.use) {
              this.userTotalDays = this.userTotalDays + days.days
            }
          })
          this.getWorkleaves(value.id);
        }
      );
  }
  public loadTables = () => {
    this.backendService.getLoggedInUser().subscribe(value => {
      this.getWorkleaves(value.id);
    })
  }
  getWorkleaves = (userID:number) => {
    if (this.isManager() && userID) {
      this.backendService.getSubWorkleavesByMStat(userID, "Pending")?.subscribe(value => this.subUsersWL = value
      );
    }
    if (this.isAdmin() && userID) {
      this.backendService.getAllWorkleavesByAdminStat("Pending")?.subscribe(value => this.subUsersWL = value);
      this.backendService.getAllWorkleavesNoManager().subscribe(value => this.adminWL = value);
    }
  }

  openDialog(): void {
    this.dialog.open(WldialogComponent, {
      width: 'clamp(300px,50%,500px)'
    });
  }

  isAdmin() {
    return this.backendService.isAdmin()
  }

  isManager() {
    return this.backendService.isManager()
  }


}
