import { Component, OnInit } from '@angular/core';
import {RaceService} from "../race.service";
import {ClientService} from "../client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Rider} from "../entities/Rider";
import {Participant} from "../entities/Participant";
import {ParticipantService} from "../participant.service";
import {RiderService} from "../rider.service";
import {Race} from "../entities/Race";
import {BetService} from "../bet.service";
import {Bet} from "../entities/Bet";

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.less']
})
export class BetComponent implements OnInit {
    race: Race;
    rider: Rider;
    participant: Participant;
    bet: number;
    constructor(private riderService: RiderService,
                private clientService: ClientService,
                private route: ActivatedRoute,
                private router: Router,
                private participantService: ParticipantService,
                private raceService: RaceService,
                private betService: BetService) {
        this.bet = this.clientService.user!=null?this.clientService.user.account:0;
    }

    ngOnInit() {
        this.getRace();
        this.getParticipant();
    }

    getRace(): void {
        const id = +this.route.snapshot.paramMap.get('raceId');
        this.raceService.getRace(id)
            .subscribe(race => {
                this.race = race;
                console.log("RACE" + JSON.stringify(this.race));
            });
    }

    getParticipant(): void {
        const id = +this.route.snapshot.paramMap.get('partId');
        this.participantService.getParticipant(id)
            .subscribe(participant => {
                this.participant = participant;
                console.log("PARTICIPANT " + JSON.stringify(this.participant));
                this.getRider(this.participant.riderId);
            });
    }

    getRider(id: number): void {
        this.riderService.getRider(id).subscribe(rider => {
            this.rider = rider;
            console.log("RIDER " + JSON.stringify(this.rider));

        });
    }

    makeBet() {
        // console.log("USER BEFORE" + this.clientService.user);
        var bet = {
            id: -1,
                clientId: this.clientService.user.id,
            participantId: this.participant.id,
            sum: +this.bet.toFixed(2),
            state: "Expecting"
        };
        console.log("POST: " + JSON.stringify(bet));
        this.checkBet();
        this.betService.addBet({
            clientId: this.clientService.user.id,
            participantId: this.participant.id,
            sum: +this.bet.toFixed(2),
            state: "Expecting"
        }).subscribe( upd=> {
            this.clientService.checkUser(this.clientService.user.login, this.clientService.user.pass).subscribe( user=>this.clientService.user = user);
            //this.router.navigateByUrl('/my-bets');


        })
    }


    checkBet() {
        this.bet = this.bet <= 5 ? 5 : this.bet;
        this.bet = this.clientService.user!=null && this.bet >= this.clientService.user.account ? this.clientService.user.account: this.bet;
    }

}
