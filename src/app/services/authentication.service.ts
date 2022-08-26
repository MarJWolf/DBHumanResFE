import {Injectable} from '@angular/core';
import {UserS} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _LoggedUser?: UserS;

  constructor(private http: HttpClient) {
  }

  public getLoggedUser(): UserS|undefined{
    if(!this._LoggedUser)
    {
      let user = sessionStorage.getItem("LoggedUser");
      if(user){
        this._LoggedUser = JSON.parse(user);
      }
    }
    return this._LoggedUser;
  }

  set LoggedUser(value: UserS) {
    this._LoggedUser = value;
  }

  logOut() {
    this._LoggedUser = undefined;
    sessionStorage.removeItem("LoggedUser");
    this.http.post("http://localhost:8080/logout",{}).subscribe();
  }
}
