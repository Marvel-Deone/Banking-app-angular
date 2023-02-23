import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tokenMessage?: any;
  currency: any = 'NGN';
  token?: any;
  id?: any;
  userProfile?: any;
  errorMessage?: any;
  tokenArr?: [];
  tokenObj?: any;
  auth_tkn?: any;
  account_no?: any;
  balance?: any;
  userProfileDetails = {
    id: '',
    username: '',
    email: '',
    account_no: '',
    balance: '',
    address: '',
    country: '',
    dob: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    gender: '',
    profileImage: '',
    state: ''
  }
  transactionResponse?: any;
  transactions: any = [];

  constructor(private auth: UserService, private router: Router, private transactionService: TransactionService) { }

  ngOnInit(): void {


    if (localStorage.getItem('token')) {
      this.tokenMessage = localStorage.getItem('token');
      this.tokenObj = this.tokenMessage.split(',')[1];
      this.token = this.tokenObj.slice(9);
      this.id = this.token.slice(0, -1);
      localStorage.setItem('auth_tkn', JSON.stringify(this.id));
    }



    this.auth.GetProfile().subscribe(
      item => {
        this.userProfile = item.profile;
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
    );

    this.transactionService.FetchTransactions(this.userProfileDetails.id).subscribe(
      response => {
        this.transactionResponse = response;
        this.transactions = this.transactionResponse.transactions;
      },
      errorResponse => {
        this.errorMessage = errorResponse;
        console.log(this.errorMessage.error.message);
        if (this.errorMessage.error.message == 'jwt expired') {
          this.router.navigate(['sign-in']);
        }
      });

  }


}
