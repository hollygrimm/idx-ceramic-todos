import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {

        console.log('injector');
        const appErrorHandler = this.injector.get(ErrorHandler);
        appErrorHandler.handleError(err);
        return throwError(err);
      })
    )
  }

}

