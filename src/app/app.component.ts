import { Component } from '@angular/core';
import {Client} from "./entities/Client";
import { Location } from '@angular/common';
import {Router} from '@angular/router';


import {ClientService} from "./client.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'HALO';


  constructor(private clientService: ClientService,
              private router: Router,
              private location: Location) {}

  pressedJoin(): void {
    if(this.clientService.user) {
      this.clientService.user = null;
      console.log(this.location.path());

      if(this.location.isCurrentPathEqualTo("/my-bets"))
      {
        this.location.back();
      }
    }
    else {
      this.router.navigateByUrl('/registration');
    }
  }
}
