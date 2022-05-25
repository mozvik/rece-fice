import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable(
    { providedIn: 'root' }
  )

export class ErrorIntercept implements HttpInterceptor {

     constructor(private snackBar: MatSnackBar) { }

    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(request)
          .pipe(
            //   retry(1),
              catchError((error: HttpErrorResponse) => {
                  let errorMessage = '';
                  if (error.error instanceof ErrorEvent) {
                      // client-side error
                      errorMessage = `Error: ${error.error.message}`;
                  } else {
                      // server-side error
                      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                  }
                  console.log(errorMessage);
                  this.snackBar.open(errorMessage, '', {
                    verticalPosition: 'bottom',
                    horizontalPosition: 'end',
                    panelClass: 'snack-error',
                    duration: 5000,
                  });
                  return throwError(() => errorMessage);
              })
          )
  }
}
