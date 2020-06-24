import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;
  constructor(private authSvc: AuthService, private router: Router, public calendarSvc: CalendarService) { }

  ngOnInit() {
    this.authSvc.isLoggedIn.subscribe(
      data => this.loggedIn = data
    );
  }

  logout() {
    this.authSvc.signOut();
    this.router.navigate(['login']);
  }

}
