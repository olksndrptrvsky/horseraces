import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RacesComponent } from './races/races.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule} from "@angular/forms";
import { RaceDetailComponent } from './race-detail/race-detail.component';
import { BetComponent } from './bet/bet.component';
import { MyBetsComponent } from './my-bets/my-bets.component';

@NgModule({
  declarations: [
    AppComponent,
    RacesComponent,
    SignInComponent,
    RegistrationComponent,
    RaceDetailComponent,
    BetComponent,
    MyBetsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
