import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { CalendarService } from '../calendar.service';
import { isNgTemplate } from '@angular/compiler';
import { start } from 'repl';

@Component({
  selector: 'app-mycalendar',
  templateUrl: './mycalendar.component.html',
  styleUrls: ['./mycalendar.component.css']
})
export class MycalendarComponent implements OnInit {

  calendarEvents: any[] = [];
  rendered = false;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick(info) {
      console.log(info);
    },
    events: this.calendarEvents
  };
  constructor(private calendar: CalendarService) { }

  ngOnInit() {
    this.calendar.getPrimaryCalendar().then(
      () => {
        for (const item of this.calendar.calendarEventsPrimary) {
          item.title = item.summary;
          item.start = item.start.dateTime;
          item.end = item.start.end;
          this.calendarEvents.push(item);
        }
        this.rendered = true;
      }
    );
  }

  clickEvent() {

  }

}
