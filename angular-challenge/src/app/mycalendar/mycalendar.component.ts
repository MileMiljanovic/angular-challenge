import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { CalendarService } from '../calendar.service';
import { ModalManager } from 'ngb-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-mycalendar',
  templateUrl: './mycalendar.component.html',
  styleUrls: ['./mycalendar.component.css'],
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
export class MycalendarComponent implements OnInit {

  calendarEvents: any[] = [];
  rendered = false;
  selectedEvent: any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.clickEvent.bind(this),
    events: this.calendarEvents
  };
  @ViewChild('eventModal', {static: false}) eventModal;
  constructor(private calendar: CalendarService, private modalService: ModalManager, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.calendar.getCalendar('primary').then(
      () => {
        for (const item of this.calendar.calendarEventsPrimary) {
          item.title = item.summary ? item.summary : 'No name';
          item.start = item.start.dateTime ? item.start.dateTime : item.start;
          item.end = item.end.dateTime ? item.end.dateTime : item.end;
          this.calendarEvents.push(item);
        }
        this.spinner.hide();
        this.rendered = true;
      }
    );
  }

  clickEvent(arg) {
    this.selectedEvent = arg.event;
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

}
