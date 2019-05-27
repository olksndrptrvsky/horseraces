import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Participant } from "./entities/Participant";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/internal/operators/catchError";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  participantUrl: string = "/api/participants";
  constructor( private http: HttpClient,) { }

  getParticipant(id: number): Observable<Participant> {
    return this.http.get<Participant>(this.participantUrl+"/"+id)
        .pipe(
            catchError(this.handleError<Participant>('getParticipant'))
        );
  }


  getParticipantsForRace(id: number): Observable<Participant[]> {
    //console.log("HERE");
    return this.http.get<Participant[]>("/api/participantsForRace/"+id)
        .pipe(
            catchError(this.handleError<Participant[]>('getParticipantsForRace', []))
        );
  }


  deleteParticipant(id: number): Observable<Participant> {
    return this.http.delete<Participant>("/api/participants/"+id, httpOptions).pipe(
        catchError(this.handleError<Participant>('deleteParticipant')));

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
