import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {Manager, User, UserSimp} from "../interfaces/user";
import {Workleave} from "../interfaces/workleave";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

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

  getAllUsers() {
    return this.http.get<UserSimp[]>("http://localhost:8080/users/allSimplified");
  }

  getAllInactiveUsers() {
    return this.http.get<UserSimp[]>("http://localhost:8080/users/allInactiveSimplified");
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

  cancelWorkleave(workleaveId : number, status: string){
    return this.http.put("http://localhost:8080/workleaves/cancelWorkleave", {},{
      params: {workleaveId, status}
    });
  }

  updateWorkleave(uwv: any){
    return this.http.put("http://localhost:8080/workleaves/update", {...uwv});
  }

  createWorkleave(workleave: any){
    return this.http.post("http://localhost:8080/workleaves/create", workleave);
  }

  updateUser(uv: User){
    return this.http.put("http://localhost:8080/users/update", {...uv});
  }

  dismissUser(uv: any){
    return this.http.put("http://localhost:8080/users/dismiss", {...uv});
  }

  createUser(user: any){
    return this.http.post("http://localhost:8080/users/create", user);
  }

  getAllWorkleavesNoManager() {
    return this.http.get<Workleave[]>("http://localhost:8080/workleaves/pendingWithoutManager");
  }

  getAllWorkleaves() {
    return this.http.get<Workleave[]>("http://localhost:8080/workleaves/allSimplified");
  }

  getSubWorkleaves(Id: number) {
    return this.http.get<Workleave[]>("http://localhost:8080/managers/workleavesByUserId", {params: {Id}});
  }

  getManagerNames() {
    return this.http.get<Manager[]>("http://localhost:8080/managers/managerNames");
  }

  getById(Id: number) {
    return this.http.get<Workleave[]>("http://localhost:8080/users/byId", {params: {Id}});
  }


  isAdmin() {
    return this.authService.getLoggedUser()!.userRole.includes("Admin");
  }

  isManager() {
    return this.authService.getLoggedUser()!.userRole.includes("Manager");
  }

  isUser() {
    return this.authService.getLoggedUser()!.userRole.includes("User");
  }

}
