import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      withCredentials: true
    })
    return next.handle(modifiedRequest).pipe(catchError((err: HttpErrorResponse,) => {
      if (err.status == 401) {
        sessionStorage.removeItem("LoggedUser");
        location.href = "/login"
      }
      return throwError(() => err);
    }));
  }
}
