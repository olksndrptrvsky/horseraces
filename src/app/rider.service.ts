import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/internal/operators/catchError";
import {Rider} from "./entities/Rider";
import {Race} from "./entities/Race";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RiderService {
  riderURI: string = "/api/riders";
  constructor( private http: HttpClient) { }

  getRider(id: number): Observable<Rider> {
    return this.http.get<Rider>(this.riderURI+"/"+id)
        .pipe(
            catchError(this.handleError<Rider>('getRider'))
        );
  }

  getRidersForRace(id: number): Observable<Rider[]> {
    return this.http.get<Rider[]>("/api/ridersForRace/"+id)
        .pipe(
            catchError(this.handleError<Rider[]>('getRidersForRace', []))
        );
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
}
