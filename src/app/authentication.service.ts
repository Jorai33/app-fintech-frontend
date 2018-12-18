import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = environment.apiUrl  
  private loginApiUrl = environment.loginApiUrl  

  constructor(private http: HttpClient) { }

  

  public login(data:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url = this.loginApiUrl
    return this.http.post(url, data, httpOptions).pipe(
      tap((res:any) => {
        console.log(res.token)
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.log('Login sucessfull..')
      }),
      catchError(this.handleError<any>('login'))
    );

  }


  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  /** Log a AppService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`AppService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (res: any): Observable<T> => {
      let error = res.error
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
