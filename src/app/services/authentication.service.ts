import {Injectable} from '@angular/core';
import {UserS} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _LoggedUser?: UserS;

  constructor() {
  }

  public getLoggedUser(): UserS | undefined{

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

}
