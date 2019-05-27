import { Injectable } from '@angular/core';
import { Race } from "./entities/Race";
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/internal/operators/catchError";
import {tap} from "rxjs/internal/operators/tap";
import {Participant} from "./entities/Participant";
import {Rider} from "./entities/Rider";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private  racesURI = '/api/races';
  constructor( private http: HttpClient,) { }

  getRaces(): Observable<Race[]> {
    return this.http.get<Race[]>(this.racesURI)
        .pipe(
            catchError(this.handleError<Race[]>('getRaces', []))
        );
  }

  getRace(id: number): Observable<Race> {
    return this.http.get<Race>(this.racesURI+"/"+id)
        .pipe(
            catchError(this.handleError<Race>('getRace'))
        );
  }


  deleteRace(id:number): Observable<Race> {
    const url = this.racesURI+"/"+id;
    return this.http.delete<Race>(url, httpOptions).pipe(
        catchError(this.handleError<Race>('deleteRace')));
  }


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


  formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('.');
  }

  isAfter(dateTime: Date) {
    return Date.now().valueOf() < dateTime.valueOf();
  }
}
