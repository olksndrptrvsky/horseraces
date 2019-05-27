import {Injectable, Input} from '@angular/core';
import { Client } from "./entities/Client";
import {Observable, of} from "rxjs";
import {Race} from "./entities/Race";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Location } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  user: Client;
  private clientUrl = '/api/clients';
  constructor( private http: HttpClient,
               private location: Location
               ) {
    this.user = null;
  }

  checkUser(login: string, pass: string): Observable<Client> {
    return  this.http.post<Client>("/api/checkAuthorisation", "{\"login\": \"" + login + "\", \"pass\": \"" + pass + "\"}" , httpOptions);
  }

  // updateUser(): Observable<Client> {
  //   return this.http.get<Client>(this.clientUrl+"/"+this.user.login)
  //       .pipe(
  //           catchError(this.handleError<Client>('updateUser'))
  //       );
  // }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  checkLogin(login: string): boolean {
    return login=="noob";
  }
}

