import { Injectable } from '@angular/core';
import { Bet } from "./entities/Bet";

import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Race} from "./entities/Race";
import {BetData} from "./entities/BetData";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class BetService {
  betURI: string = "/api/bets";
  constructor(private http: HttpClient,) { }

  addBet(bet: Object): Observable<Bet>
  {
    return this.http.post<Bet>(this.betURI, bet, httpOptions)
        .pipe(
            catchError(this.handleError<Bet>('addBet'))
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

  getBetsDataForClient(id: number): Observable<BetData[]> {
    return this.http.get<BetData[]>("/api/betsDataForClient/"+ id)
        .pipe(
            catchError(this.handleError<BetData[]>('getBetsForClient'))
        );
  }
}
