import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
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

  constructor(private http: HttpClient, private router: Router, private userService: UserService, public dialog: MatDialog) {
  }


  ngOnInit(): void {
    let userInfo = this.userService.getLoggedInUser();

    if (userInfo) {
      userInfo.subscribe(value => {
          this.user = value;
          this.workleaves = this.user?.allWorkleaves?? [];
          if (this.isManager() && this.user) {
            this.userService.getSubWorkleavesByMStat(this.user.id, "Pending")?.subscribe(value => this.subUsersWL = value
            );
          }
          if (this.isAdmin() && this.user) {
            this.userService.getAllWorkleavesByAdminStat("Pending")?.subscribe(value => this.subUsersWL = value);
            this.userService.getAllWorkleavesNoManager().subscribe(value => this.adminWL = value);

          }
        }
      );
    }

  }

  openDialog(): void {
    this.dialog.open(WldialogComponent, {
      width: 'clamp(300px,50%,500px)'
    });
  }

  isAdmin() {
    return this.userService.isAdmin()
  }

  isManager() {
    return this.userService.isManager()
  }


}
