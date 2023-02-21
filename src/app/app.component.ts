import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

  constructor(private router: Router, public user: UserService) { }

  title = 'banking-app';
  isMenuVisible: boolean = true;
  ngDoCheck(): void {
    // throw new Error('Method not implemented');
    const currentroute = this.router.url;
    console.log(currentroute);


    if (currentroute == '/sign-in') {
      this.isMenuVisible = false;
    } else if (currentroute == '/sign-up') {
      this.isMenuVisible = false;
    } else if (currentroute == '/landing-page') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }
  }


}
