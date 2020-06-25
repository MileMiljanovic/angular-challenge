import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { CalendarService } from '../calendar.service';
import { ModalManager } from 'ngb-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-secondary-calendars',
  templateUrl: './secondary-calendars.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./secondary-calendars.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(800, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SecondaryCalendarsComponent implements OnInit {

  allCalendars: any[] = [];
  calendarEvents: any[] = [];
  rendered = false;
  selectedEvent: any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.clickEvent.bind(this),
    events: this.calendarEvents
  };
  @ViewChild('eventModal', {static: false}) eventModal;
  constructor(private calendar: CalendarService, private modalService: ModalManager,
              private spinner: NgxSpinnerService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.spinner.show();
    this.calendar.getAllCalendars().then(
      () => {
        for (const item of this.calendar.allCalendars) {
          const calItem = {
            id: item.id,
            name: item.summary
          };
          this.allCalendars.push(calItem);
        }
        this.spinner.hide();
        this.rendered = true;
      }
    );
  }

  clickEvent(arg) {
    this.selectedEvent = arg.event;
    console.log(this.selectedEvent);
    this.modalService.open(this.eventModal, {
      size: 'md',
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: true,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: 'modal-backdrop'
    });
  }


  onChange(event) {
    this.rendered = false;
    this.spinner.show();
    if (event.srcElement.checked) {
      this.calendar.getCalendar(event.srcElement.id).then(
        () => {
          for (const item of this.calendar.calendarEventsPrimary) {
            item.title = item.summary ? item.summary : 'No name';
            item.start = item.start.dateTime ? item.start.dateTime : item.start;
            item.end = item.end.dateTime ? item.end.dateTime : item.end;
            item.calendarId = event.srcElement.id;
            this.calendarEvents.push(item);
          }
          this.spinner.hide();
          this.rendered = true;
        }
      );
    } else {
      for (let i = 0; i < this.calendarEvents.length; i++) {
        if (this.calendarEvents[i].calendarId === event.srcElement.id) {
          this.calendarEvents.splice(i--, 1);
        }
      }
      this.ref.detectChanges();
      this.spinner.hide();
      this.rendered = true;
    }
  }

}
