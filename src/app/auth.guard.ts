import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "./services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private authService:AuthenticationService, private router:Router) {
  }

  isLoggedIn(): boolean{
    console.log(this.authService.getLoggedUser())
    if(this.authService.getLoggedUser() == undefined){
      this.router.navigate(["login"])
    }
    return this.authService.getLoggedUser() != undefined;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    return this.isLoggedIn();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    return this.isLoggedIn();
  }

}
