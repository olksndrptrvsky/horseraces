import { Component, OnInit } from '@angular/core';
import {Race} from "../entities/Race";
import {RaceService} from "../race.service";
import {Observable} from "rxjs";
import {ClientService} from "../client.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.less']
})
export class RacesComponent implements OnInit {
  races: Race[];
  constructor(private raceService: RaceService,
              private clientService: ClientService) {

    // this.getRaces();

  }

  ngOnInit() {
    this.getRaces();
  }

  getRaces(): void {
    this.raceService.getRaces()
        .subscribe(races => {
          this.races = races;
          this.races.forEach( (race)=> { race.dateTime = new Date(race.dateTime)});
        });
  }



  deleteRace(id: number): void {
    this.raceService.deleteRace(id).subscribe( upd=> {
      this.getRaces();
    })
  }


}
