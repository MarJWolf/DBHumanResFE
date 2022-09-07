import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {CompanyInfo, Days, Holiday, JobTitle, Manager, User, UserSimp, Workplace} from "../interfaces/user";
import {CalendarDTO, CalendarYearDTO, Workleave} from "../interfaces/workleave";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  backendUrl = environment.backendUrl;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  // users

  getLoggedInUser() {
    const loggedUser = this.authService.getLoggedUser();
    if (!loggedUser) return undefined;
    return this.http.get<User>(this.backendUrl + "/users/byId", {
      params: {Id: loggedUser.userID}
    });
  }

  getAllUsers() {
    return this.http.get<UserSimp[]>(this.backendUrl + "/users/allSimplified");
  }

  getAllUsersNotS() {
    return this.http.get<UserSimp[]>(this.backendUrl + "/users/all");
  }

  getAllInactiveUsers() {
    return this.http.get<UserSimp[]>(this.backendUrl + "/users/allInactiveSimplified");
  }

  updateUser(uv: User) {
    return this.http.put(this.backendUrl + "/users/update", {...uv});
  }

  dismissUser(uv: any) {
    return this.http.put(this.backendUrl + "/users/dismiss", {...uv});
  }

  createUser(user: any) {
    return this.http.post(this.backendUrl + "/users/create", user);
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

  //days

  saveDays(days: Days) {
    return this.http.post<Days[]>(this.backendUrl + "/users/createDays", days);
  }

  deleteDays(Id: number) {
    return this.http.delete(this.backendUrl + "/users/deleteDays", {params: {Id}});
  }

  getDaysByUserId(userID: number) {
    return this.http.get<Days[]>(this.backendUrl + "/users/allDaysByUserId", {params: {userID}});
  }


  // workplace

  getAllWorkplaces() {
    return this.http.get<Workplace[]>(this.backendUrl + "/users/allWorkplaces");
  }

  deleteWorkplace(Id: number) {
    return this.http.delete(this.backendUrl + "/users/deleteWorkplace", {params: {Id}});
  }

  createWorkplace(name: string) {
    return this.http.post(this.backendUrl + "/users/createWorkplace", {}, {params: {name}});
  }

  //jobtitle

  getAllJobTitles() {
    return this.http.get<JobTitle[]>(this.backendUrl + "/users/allJobTitles");
  }

  deleteJobTitle(Id: number) {
    return this.http.delete(this.backendUrl + "/users/deleteJobTitle", {params: {Id}});
  }

  getJobTitleById(Id: number) {
    return this.http.get<JobTitle>(this.backendUrl + "/users/getJobTitleById", {params: {Id}});
  }

  createJobTitle(name: string) {
    return this.http.post(this.backendUrl + "/users/createJobTitle", {}, {params: {name}});
  }

  //company info

  getCompanyInfo() {
    return this.http.get<CompanyInfo>(this.backendUrl + "/users/getCompanyInfo");
  }

  updateCompanyInfo(Cname: string, Oname: string) {
    return this.http.put(this.backendUrl + "/users/updateCompanyInfo", {}, {params: {Cname, Oname}});
  }

  //workleaves

  getSubWorkleavesByMStat(userId: number, status: string) {
    return this.http.get<Workleave[]>(this.backendUrl + "/workleaves/byUserAndMStatSimplified", {
      params: {userId, status}
    });
  }

  getAllWorkleavesByAdminStat(status: string) {
    return this.http.get<Workleave[]>(this.backendUrl + "/workleaves/byAdminStatSimplified", {
      params: {status}
    });
  }

  changeStatus(workleaveId: number, status: string) {
    return this.http.put(this.backendUrl + "/workleaves/changeStatus", {}, {
      params: {workleaveId, status}
    });
  }

  cancelWorkleave(workleaveId: number, status: string) {
    return this.http.put(this.backendUrl + "/workleaves/cancelWorkleave", {}, {
      params: {workleaveId, status}
    });
  }

  updateWorkleave(uwv: any) {
    return this.http.put(this.backendUrl + "/workleaves/update", {...uwv});
  }

  createWorkleave(workleave: any) {
    return this.http.post(this.backendUrl + "/workleaves/create", workleave);
  }


  getAllWorkleavesNoManager() {
    return this.http.get<Workleave[]>(this.backendUrl + "/workleaves/pendingWithoutManager");
  }

  getAllWorkleaves(userId?: number, start?: Date, end?: Date) {
    let params = new HttpParams();
    if (userId) params = params.append("userId", userId);
    if (start) params = params.append("after", start.toLocaleDateString());
    if (end) params = params.append("before", end.toLocaleDateString());
    console.log(params.toString())
    return this.http.get<Workleave[]>(this.backendUrl + "/workleaves/allSimplified", {params});
  }

  //managers

  getSubWorkleaves(Id: number) {
    return this.http.get<Workleave[]>(this.backendUrl + "/managers/workleavesByUserId", {params: {Id}});
  }

  getManagerNames() {
    return this.http.get<Manager[]>(this.backendUrl + "/managers/managerNames");
  }


  getById(Id: number) {
    return this.http.get<User>(this.backendUrl + "/users/byId", {params: {Id}});
  }

  // document
  getWorkleaveDocument(id: number) {
    return this.http.get(this.backendUrl + "/workleave", {params: {workleaveId: id}, responseType: 'blob'})
  }

  getNewWorkleaveDocument(id: number) {
    return this.http.get(this.backendUrl + "/workleave", {
      params: {workleaveId: id, createAgain: true},
      responseType: 'blob'
    })
  }

  //holiday

  getAllHolidays() {
    return this.http.get<Holiday[]>(this.backendUrl + "/holidays/allHolidays");
  }

  deleteHoliday(Id: number) {
    return this.http.delete(this.backendUrl + "/holidays/deleteHoliday", {params: {Id}});
  }

  createHoliday(holidayDate: Date, holidayName: string) {
    return this.http.put(this.backendUrl + "/holidays/createHoliday", {
      date: holidayDate,
      localName: holidayName
    }, {});
  }

  getCalendarData(year: number, month: number): Observable<CalendarDTO[]> {
    return this.http.get<CalendarDTO[]>(this.backendUrl + "/workleaves/calendar", {params: {year, month}})
  }

  getCalendarYearData(year: number): Observable<CalendarYearDTO[]> {
    return this.http.get<CalendarYearDTO[]>(this.backendUrl + "/workleaves/calendar/year", {params: {year}})

  }
}
