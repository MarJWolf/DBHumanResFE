import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {CompanyInfo, Holiday, JobTitle, Manager, User, UserSimp, Workplace} from "../interfaces/user";
import {Workleave} from "../interfaces/workleave";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  // users

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

  updateUser(uv: User){
    return this.http.put("http://localhost:8080/users/update", {...uv});
  }

  dismissUser(uv: any){
    return this.http.put("http://localhost:8080/users/dismiss", {...uv});
  }

  createUser(user: any){
    return this.http.post("http://localhost:8080/users/create", user);
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

  // workplace

  getAllWorkplaces() {
    return this.http.get<Workplace[]>("http://localhost:8080/users/allWorkplaces");
  }

  deleteWorkplace(Id: number) {
    return this.http.delete("http://localhost:8080/users/deleteWorkplace", {params: {Id}});
  }

  createWorkplace(name: string) {
    return this.http.post("http://localhost:8080/users/createWorkplace",{}, {params:{name}});
  }

  //jobtitle

  getAllJobTitles() {
    return this.http.get<JobTitle[]>("http://localhost:8080/users/allJobTitles");
  }

  deleteJobTitle(Id: number) {
    return this.http.delete("http://localhost:8080/users/deleteJobTitle", {params: {Id}});
  }

  getJobTitleById(Id: number) {
    return this.http.get<JobTitle>("http://localhost:8080/users/getJobTitleById",{params:{Id}});
  }

  createJobTitle(name: string) {
    return this.http.post("http://localhost:8080/users/createJobTitle",{}, {params:{name}});
  }

  //company info

  getCompanyInfo() {
    return this.http.get<CompanyInfo>("http://localhost:8080/users/getCompanyInfo");
  }

  updateCompanyInfo(Cname: string, Oname: string) {
    return this.http.put("http://localhost:8080/users/updateCompanyInfo", {},{params:{Cname, Oname}});
  }

  //workleaves

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


  getAllWorkleavesNoManager() {
    return this.http.get<Workleave[]>("http://localhost:8080/workleaves/pendingWithoutManager");
  }

  getAllWorkleaves() {
    return this.http.get<Workleave[]>("http://localhost:8080/workleaves/allSimplified");
  }

  //managers

  getSubWorkleaves(Id: number) {
    return this.http.get<Workleave[]>("http://localhost:8080/managers/workleavesByUserId", {params: {Id}});
  }

  getManagerNames() {
    return this.http.get<Manager[]>("http://localhost:8080/managers/managerNames");
  }


  getById(Id: number) {
    return this.http.get<User>("http://localhost:8080/users/byId", {params: {Id}});
  }

  // document
  getWorkleaveDocument(id: number) {
    return this.http.get("http://localhost:8080/workleave",{params:{workleaveId:id}, responseType: 'blob' })
  }

  //holiday

  getAllHolidays() {
    return this.http.get<Holiday[]>("http://localhost:8080/holidays/allHolidays");
  }

  deleteHoliday(Id: number) {
    return this.http.delete("http://localhost:8080/holidays/deleteHoliday", {params: {Id}});
  }

  createHoliday(holidayDate:Date,holidayName:string) {
    return this.http.put("http://localhost:8080/holidays/createHoliday",{date:holidayDate,localName:holidayName }, {});
  }
}
