import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.initClient();
    this.user$ = afAuth.authState;
   }

   initClient() {
     gapi.load('client', () => {
       console.log('Loaded client');

       gapi.client.init({
        apiKey: 'AIzaSyDBgmKOuLvciZ6i1SxWzKs4_qR92YwzlQM',
        clientId: '813615195650-068gfsdn3u243s81p78kkt4o91ptr808.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
       });

       gapi.client.load('calendar', 'v3', () => console.log('Loaded calendar'));
     });
   }

   async login() {
     console.log(gapi);
     const googleAuth = gapi.auth2.getAuthInstance;
     const googleUser = await googleAuth.signIn();
     const token = googleUser.getAuthResponse().id_token;
     console.log('User is:');
     console.log(googleUser);
     const credential = auth.GoogleAuthProvider.credential(token);
     await this.afAuth.signInAndRetrieveDataWithCredential(credential);
   }

   logout() {
     this.afAuth.signOut();
   }

   async getCalendar() {
     const events = await gapi.client.calendar.events.list({
       calendarId: 'primary',
       timeMin: new Date().toISOString(),
       showDeleted: false,
       singleEvents: true,
       maxResults: 10,
       orderBy: 'startTime'
     });

     console.log('Events are:');
     console.log(events);
   }
}
