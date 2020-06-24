import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  calendarEventsPrimary: any[];
  user: firebase.User;
  constructor(private authSvc: AuthService) {
    this.authSvc.user.subscribe(
      data => this.user = data
    );
  }

  async getPrimaryCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: true,
      singleEvents: true,
      maxResults: 100,
      orderBy: 'startTime'
    });
    this.calendarEventsPrimary = events.result.items;
  }
}
