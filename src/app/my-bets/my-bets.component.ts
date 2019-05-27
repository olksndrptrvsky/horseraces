import { Component, OnInit } from '@angular/core';
import {Bet} from "../entities/Bet";
import {BetService} from "../bet.service";
import {ClientService} from "../client.service";
import {Router} from "@angular/router";
import {BetData} from "../entities/BetData";
import {RaceService} from "../race.service";

@Component({
  selector: 'app-my-bets',
  templateUrl: './my-bets.component.html',
  styleUrls: ['./my-bets.component.less']
})
export class MyBetsComponent implements OnInit {
  bets: BetData[];
  constructor(private betService: BetService,
              private clientService: ClientService,
              private router: Router,
              private raceService: RaceService) {
    if(this.clientService.user==null) this.router.navigateByUrl("/sign-in");
  }

  ngOnInit() {
    this.getBets();
  }

  getBets() {
    this.betService.getBetsDataForClient(this.clientService.user.id).subscribe( bets=> {
      this.bets = bets;
      this.bets.forEach( (bet)=> { bet.raceDateTime = new Date(bet.raceDateTime)});

    });
  }

}
