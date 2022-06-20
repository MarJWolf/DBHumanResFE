import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {User} from "../interfaces/user";
import {Workleave} from "../interfaces/workleave";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  getLoggedInUser() {
    const loggedUser = this.authService.getLoggedUser();
    if (loggedUser) {
      return this.http.get<User>("http://localhost:8080/users/byId", {
        params: {Id: loggedUser.userID}
      });
    }
    return null;
  }

  getSubWorkleavesByMStat(userId: number, status: string) {
    return this.http.get<Workleave[]>("http://localhost:8080/workleaves/byUserAndMStatSimplified", {
      params: {userId, status}
    });
  }

  getAllWorkleavesByAdminStat(status: string) {
    return this.http.get<Workleave[]>("http://localhost:8080/workleaves/byAdminStatSimplified", {
      params: {status}
    });
  }

  changeStatus(workleaveId : number, status: string){
    return this.http.put("http://localhost:8080/workleaves/changeStatus", {},{
      params: {workleaveId, status}
    });
  }

  updateWorkleave(uwv: any){

    return this.http.put("http://localhost:8080/workleaves/update", {...uwv});
  }

  createWorkleave(workleave: any){
    return this.http.post("http://localhost:8080/workleaves/create", {workleave});
  }

  getAllWorkleavesNoManager() {
    return this.http.get<Workleave[]>("http://localhost:8080/workleaves/pendingWithoutManager");
  }

  isAdmin() {
    return this.authService.getLoggedUser()!.userRole.includes("Admin");
  }

  isManager() {
    return this.authService.getLoggedUser()!.userRole.includes("Manager");
  }

}
