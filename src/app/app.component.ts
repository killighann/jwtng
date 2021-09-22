import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jwtng';

  constructor(private authService: AuthService) {

  }


  onTest() {
    this.authService.login('laurent', '123456').subscribe((response => {
      console.log('retour');
    }));
  }
}
