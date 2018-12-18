import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FintechService } from '../fintech/fintech.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private fintechService: FintechService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(res => {
            if (res.status === 401) {
                // auto logout if 401 response returned from api
                this.fintechService.logout();
                location.reload(true);
            }
            
            const error = res.error.message || res.statusText;
            return throwError(error);
        }))
    }
}