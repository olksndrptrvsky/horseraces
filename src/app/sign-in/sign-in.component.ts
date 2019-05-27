import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ClientService} from "../client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {

  constructor(private location: Location,
              private clientService: ClientService,
              private router: Router) {
    if(clientService.user!=null) this.router.navigateByUrl("/my-bets");
  }

  ngOnInit() {
  }

  checkUser(login: string, pass: string): void {
    this.clientService.checkUser(login, pass).subscribe( user => {
      this.clientService.user = user;
      console.log(JSON.stringify(this.clientService.user));
      if(this.clientService.user!=null) {
        this.getBack();
      }
    })

  }

  getBack(): void {
    this.location.back();

  }

}
