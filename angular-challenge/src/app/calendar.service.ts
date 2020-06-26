import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GAPIService } from './gapi.service';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  calendarEventsPrimary: any[];
  user: firebase.User;
  allCalendars: any[];
  constructor(private authSvc: AuthService, private gapiSvc: GAPIService) {
    this.authSvc.user.subscribe(
      data => this.user = data
    );
  }

  async getCalendar(param: string) {
    if (!gapi.client) {
      await this.gapiSvc.initClient();
    }
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
    if (!gapi.client) {
      await this.gapiSvc.initClient();
    }
    const calendars = await gapi.client.calendar.calendarList.list();
    this.allCalendars = calendars.result.items;
  }
}
