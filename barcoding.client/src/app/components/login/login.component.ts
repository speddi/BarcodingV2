import { Component, ViewChild } from '@angular/core';

import { LoginControlComponent } from './login-control.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild(LoginControlComponent, { static: true })
  loginControl!: LoginControlComponent;
}
