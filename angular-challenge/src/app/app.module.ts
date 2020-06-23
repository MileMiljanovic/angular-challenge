import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecondaryCalendarsComponent } from './secondary-calendars/secondary-calendars.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MycalendarComponent } from './mycalendar/mycalendar.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent, children: [
    { path: 'mycalendar', component: MycalendarComponent },
    { path: 'secondary', component: SecondaryCalendarsComponent },
    { path: 'statistics', component: StatisticsComponent }
  ] },
];

const firebaseConfig = {
  apiKey: 'AIzaSyDBgmKOuLvciZ6i1SxWzKs4_qR92YwzlQM',
  authDomain: 'angular-challenge-b99ce.firebaseapp.com',
  databaseURL: 'https://angular-challenge-b99ce.firebaseio.com',
  projectId: 'angular-challenge-b99ce',
  storageBucket: 'angular-challenge-b99ce.appspot.com',
  messagingSenderId: '813615195650',
  appId: '1:813615195650:web:9fc4f5874662d83142291b',
  measurementId: 'G-NSTJ8CZ03V'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomepageComponent,
    SecondaryCalendarsComponent,
    StatisticsComponent,
    MycalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
