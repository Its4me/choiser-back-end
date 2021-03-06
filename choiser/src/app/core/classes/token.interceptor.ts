import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthCoreService } from '../services/authCore.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthCoreService,
    private router: Router
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getId()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      })
    }
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => this.handleAuthError(err))
    )
  }


  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this.router.navigate(['/login'])
    }
    return throwError(error)
  }
}