import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ChartOptions } from 'chart.js';
import { ThemeService } from 'ng2-charts';
import { CalendarService } from '../calendar.service';
import { NgxSpinnerService } from 'ngx-spinner';

const TOTAL_MINUTES_WEEK = 2400;
const TOTAL_MINUTES_DAY = 480;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
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
export class StatisticsComponent implements OnInit {


  allCalendars: any[] = [];
  rendered = false;
  eventsList: any[] = [];
  pieChartLabels: string[] = ['Occupied', 'Free'];
  pieChartData: number[] = [50, 50];
  pieChartType = 'pie';
  selectedRoom: string;
  selectedMode = 'weekly';
  constructor(private themeService: ThemeService, private calendar: CalendarService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    let overrides: ChartOptions;
    overrides = {
      legend: {
        labels: { fontColor: 'white' }
      },
      scales: {
        xAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }],
        yAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }]
      }
    };
    this.themeService.setColorschemesOptions(overrides);
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

  getCalendar() {
    this.spinner.show();
    this.rendered = false;
    this.calendar.getCalendar(this.selectedRoom).then(
      () => {
        for (const item of this.calendar.calendarEventsPrimary) {
          item.title = item.summary ? item.summary : 'No name';
          item.start = item.start.dateTime ? item.start.dateTime : item.start;
          item.end = item.end.dateTime ? item.end.dateTime : item.end;
          const dt: Date = new Date(item.start);
          if (this.selectedMode === 'weekly') {
            if (this.inCurrentWeek(dt)) {
              this.eventsList.push({
                eventTitle: item.title,
                startTime: item.start,
                endTime: item.end
              });
            }
          } else {
            if (this.inCurrentMonth(dt)) {
              this.eventsList.push({
                eventTitle: item.title,
                startTime: item.start,
                endTime: item.end
              });
            }
          }
        }
        this.calculateOccupancy();
        this.spinner.hide();
        this.rendered = true;
      }
    );
  }

  onChangeSelect() {
    this.eventsList = [];
    this.getCalendar();
  }

  inCurrentWeek(dt: Date) {
    const curr: Date = new Date();
    const firstday: Date = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    const lastday: Date = new Date(curr.setDate(curr.getDate() + (7 - curr.getDay())));
    if (dt > firstday && dt < lastday) {
      return true;
    } else {
      return false;
    }
  }

  inCurrentMonth(dt: Date) {
    const curr: Date = new Date();
    if (dt.getMonth() === curr.getMonth()) {
      return true;
    } else {
      return false;
    }
  }

  calculateOccupancy() {
    let totalOccupancyMinutes = 0;
    for (const event of this.eventsList) {
      const start: any = new Date(event.startTime);
      const end: any = new Date(event.endTime);
      const diffMs = (end - start);
      const diffMins = diffMs / 60000;
      totalOccupancyMinutes += diffMins;
    }
    let percentOccupied = 0;
    if (this.selectedMode === 'weekly') {
      percentOccupied = Math.round((totalOccupancyMinutes / TOTAL_MINUTES_WEEK) * 100);
    } else {
      percentOccupied = Math.round((totalOccupancyMinutes / (TOTAL_MINUTES_DAY * this.countMonthWorkdays())) * 100);
    }

    const percentFree = 100 - percentOccupied;
    this.pieChartData[0] = percentOccupied;
    this.pieChartData[1] = percentFree;
  }

  countMonthWorkdays(): number {
    const now: Date = new Date();
    const startingDay: Date = new Date(now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString() + '-01');
    const endingDay: Date = new Date(now.getFullYear().toString() + '-' +
    (now.getMonth() + 1).toString() + '-' + this.daysInMonth(now.getMonth(), now.getFullYear()).toString());
    let count = 0;
    while (startingDay <= endingDay) {
      const dayOfWeek = startingDay.getDay();
      if (!((dayOfWeek === 6) || (dayOfWeek === 0))) {
         count++;
      }
      startingDay.setDate(startingDay.getDate() + 1);
    }
    return count;
  }

  daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

}
