import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-challenge';

  constructor(public authSvc: AuthService) {
  }
}
