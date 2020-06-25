import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ChartOptions } from 'chart.js';
import { ThemeService } from 'ng2-charts';


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

  pieChartLabels: string[] = ['Chrome', 'Safari', 'Firefox', 'Internet Explorer', 'Other'];
  pieChartData: number[] = [40, 20, 20, 10, 10];
  pieChartType = 'pie';
  constructor(private themeService: ThemeService) { }

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
  }

}
