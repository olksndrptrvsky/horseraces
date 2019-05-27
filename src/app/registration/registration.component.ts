import { Component, OnInit } from '@angular/core';
import {ClientService} from "../client.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  ngOnInit() {
  }

  checkLogin(login: string): boolean {
    return this.clientService.checkLogin(login);
  }

  addUser(login: string, pass: string, name: string): void {
    console.log("addUser [{"+login+"}, {"+pass+"},{"+name+"}];");
  }

}
