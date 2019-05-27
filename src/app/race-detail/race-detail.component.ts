import { Component, OnInit } from '@angular/core';
import {Race} from "../entities/Race";
import {RaceService} from "../race.service";
import {ClientService} from "../client.service";
import {ActivatedRoute} from "@angular/router";
import {Participant} from "../entities/Participant";
import {Rider} from "../entities/Rider";
import {ParticipantService} from "../participant.service";
import {RiderService} from "../rider.service";

@Component({
  selector: 'app-race-detail',
  templateUrl: './race-detail.component.html',
  styleUrls: ['./race-detail.component.less']
})
export class RaceDetailComponent implements OnInit {
  race: Race;
  participants: Participant[];
  riders: Rider[];
  constructor(private raceService: RaceService,
              private clientService: ClientService,
              private route: ActivatedRoute,
              private participantService: ParticipantService,
              private riderService: RiderService) { }

  ngOnInit() {
    this.getRace();

  }

  getRace() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.raceService.getRace(id)
        .subscribe(race => {
          this.race = race;
          this.race.dateTime = new Date(this.race.dateTime);
          this.getParticipants();
          this.getRiders();

          console.log(JSON.stringify(this.race));
        });
  }

  getRiders() {
    this.riderService.getRidersForRace(this.race.id)
        .subscribe(riders=> {
          this.riders = riders;
          console.log(JSON.stringify(this.riders));

        })
  }




  getParticipants() {
    this.participantService.getParticipantsForRace(this.race.id)
        .subscribe(participants => {
          this.participants = participants;
          // this.g
        });
  }

  findRider(id:number): Rider {
    return this.riders.find(rider=> rider.id===id);
  }

  deleteParticipant(id: number) {
      return this.participantService.deleteParticipant(id).subscribe( upd=> {
          this.getParticipants();
      });
  }



}
