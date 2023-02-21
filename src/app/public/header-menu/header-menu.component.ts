import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  status = false;
  userProfile?: any;
  errorMessage?: any;
  username?: any;

  constructor(private router: Router, private _snackbar: MatSnackBar, private service: UserService) { }

  ngOnInit(): void {

    this.service.GetProfile().subscribe(
      item => {
        this.userProfile = item.profile;
        console.log(this.userProfile);
        this.username = this.userProfile.username;
      },
      errorResponse => {
        this.errorMessage = errorResponse;
        console.log(this.errorMessage);
        if (this.errorMessage.error.message == 'jwt expired') {
          console.log('err expired');
          localStorage.removeItem('token');
          localStorage.removeItem('auth_tkn');
        }
      }
    )
  }

  showSideMenu() {
    this.status = !this.status
  }
  myNotification() {
    this.router.navigate(['/user/notification']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['sign-in']);
    this._snackbar.open("Logout Successful", "okay");
  }

}
