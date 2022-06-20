import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request.clone({
      withCredentials:true

    })).pipe(source => {
      source.subscribe(value => value,(error:HttpErrorResponse) => {
        if(error.status == 401)
        {
          sessionStorage.removeItem("LoggedUser");
          location.href="/login"
        }
      } )
      return source;
    });
  }
}
