import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FintechService {

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

  public getBankList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url = this.apiUrl + '/bank' ;
    return this.http.get(url, httpOptions).pipe(
      tap((res:any) => {
       
        this.log('success..')
      }),
      catchError(this.handleError<any>('getBankList'))
    );

  }
  public getActivityList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url = this.apiUrl + '/activity' ;
    return this.http.get(url, httpOptions).pipe(
      tap((res:any) => {
       
        this.log('success..')
      }),
      catchError(this.handleError<any>('getActivityList'))
    );

  }

  public createActivity(data:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url = this.apiUrl + '/activity' ;
    return this.http.post(url, data, httpOptions).pipe(
      tap((res:any) => {
       
        this.log('success..')
      }),
      catchError(this.handleError<any>('getActivityList'))
    );

  }

  public getPaymentList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url = this.apiUrl + '/payment' ;
    return this.http.get(url, httpOptions).pipe(
      tap((res:any) => {
       
        this.log('success..')
      }),
      catchError(this.handleError<any>('getPaymentList'))
    );

  }

  public doPayment(data:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url = this.apiUrl + '/payment' ;
    return this.http.post(url, data, httpOptions).pipe(
      tap((res:any) => {
       
        this.log('success..')
      }),
      catchError(this.handleError<any>('doPayment'))
    );

  }

  public getAccountList(user:string, bank: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url = this.apiUrl + '/account/user/' + user + '/bank/' + bank;
    return this.http.get(url, httpOptions).pipe(
      tap((res:any) => {
       
        this.log('success..')
      }),
      catchError(this.handleError<any>('getAccountList'))
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
