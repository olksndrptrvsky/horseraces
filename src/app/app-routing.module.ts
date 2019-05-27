import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RacesComponent} from "./races/races.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {RegistrationComponent} from "./registration/registration.component";
import {RaceDetailComponent} from "./race-detail/race-detail.component";
import {BetComponent} from "./bet/bet.component";
import {MyBetsComponent} from "./my-bets/my-bets.component";


const routes: Routes = [
  { path: '', redirectTo: '/races', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'races', component: RacesComponent },
  { path: 'race/:id', component: RaceDetailComponent },
  { path: 'my-bets', component: MyBetsComponent },
  { path: 'race/:raceId/participant/:partId', component: BetComponent }

];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
