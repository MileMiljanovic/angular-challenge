import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(80px)' }),
        animate(800, style({opacity: 1, transform: 'translateY(0px)'}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  constructor(private googleAuth: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    this.googleAuth.signIn();
  }
}
