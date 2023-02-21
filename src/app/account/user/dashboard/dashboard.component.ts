import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tokenMessage?: any;
  token?: any;
  id?: any;
  userProfile?: any;
  errorMessage?: any;
  tokenArr?: [];
  tokenObj?: any;
  auth_tkn?: any;
  account_no?: any;
  userProfileDetails?: {
    id: '',
    username: '',
    email: '',
    account_no: '',
    address: '',
    balance: '',
    country: '',
    dob: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    gender: '',
    profileImage: '',
    state: ''
  }

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {


    if (localStorage.getItem('token')) {
      this.tokenMessage = localStorage.getItem('token');
      console.log(this.tokenMessage);
      console.log("message", this.tokenMessage, this.tokenMessage.split(',')[1]);
      this.tokenObj = this.tokenMessage.split(',')[1];
      this.token = this.tokenObj.slice(9);
      this.id = this.token.slice(0, -1);
      console.log('id', this.id, this.token);
      localStorage.setItem('auth_tkn', JSON.stringify(this.id));
    }



    this.service.GetProfile().subscribe(
      item => {
        this.userProfile = item.profile;
        console.log(this.userProfile.username);
        this.account_no = this.userProfile.account_no;
        this.userProfileDetails = {
          id: this.userProfile._id,
          username: this.userProfile.username,
          email: this.userProfile.email,
          account_no: this.userProfile.account_no,
          address: this.userProfile.address,
          balance: this.userProfile.balance,
          country: this.userProfile.country,
          dob: this.userProfile.dob,
          first_name: this.userProfile.first_name,
          last_name: this.userProfile.last_name,
          phone_number: this.userProfile.phone_number,
          gender: this.userProfile.gender,
          profileImage: this.userProfile.profileImage,
          state: this.userProfile.state
        };
        console.log("Hello", this.userProfileDetails);
      },
      errorResponse => {
        this.errorMessage = errorResponse;
        console.log(this.errorMessage);
        if (this.errorMessage.error.message == 'jwt expired') {
          console.log('err expired');
          localStorage.removeItem('token');
          localStorage.removeItem('auth_tkn');
          this.router.navigate(['sign-in'])
        }
      }
    )

  }


}
