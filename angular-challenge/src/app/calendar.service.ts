import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  calendarEventsPrimary: any[];
  user: firebase.User;
  allCalendars: any[];
  constructor(private authSvc: AuthService) {
    this.authSvc.user.subscribe(
      data => this.user = data
    );
  }

  async getCalendar(param: string) {
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const events = await gapi.client.calendar.events.list({
      calendarId: param,
      timeMin: monthAgo.toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 100,
      orderBy: 'startTime'
    });
    this.calendarEventsPrimary = events.result.items;
  }

  async getAllCalendars() {
    const calendars = await gapi.client.calendar.calendarList.list();
    this.allCalendars = calendars.result.items;
  }
}
