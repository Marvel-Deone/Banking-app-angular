import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  drawalTitle?: any;
  drawalStat?: boolean;
  currency: any = 'NGN';

  public transactionsPayload = {
    sender_acc_no: '',
    recipient_acc_no: '',
    recipient_name: '',
    amount: '',
    note: '',
    recipient_id: ''
  }
  errorMessage: any;
  loading = false;
  recipientResponse?: any;
  response?: any;
  transferloading: any = false;

  userProfile: any;

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
  };
  account_no: any;
  public transactionResponse?: any;
  public transactions: any = [];

  constructor(private transactionService: TransactionService, private _snackbar: MatSnackBar, private router: Router, private auth: UserService) { }

  ngOnInit(): void {

    this.auth.GetProfile().subscribe(
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
    );

    this.transactionService.FetchTransactions(this.userProfileDetails.id).subscribe(
      response => {
        this.transactionResponse = response;
        this.transactions = this.transactionResponse.transactions;
        // this.transactions 
        console.log('transactions', this.transactions);
      },
      errorResponse => {
        this.errorMessage = errorResponse;
        console.log(this.errorMessage.error.message);
        if (this.errorMessage.error.message == 'jwt expired') {
          this.router.navigate(['sign-in']);
        }
      });

  }

  drawal(value: any) {
    this.drawalTitle = value;
    this.drawalStat = true;
  }
  myDrawal() {
    this.drawalStat = false;
  }

  checkAccountNo() {
    this.loading = true;
    let recipient_acc_no = { recipient_acc_no: this.transactions.recipient_acc_no.toString() };

    this.transactionService.VerifyReceiptAccNo(recipient_acc_no).subscribe(
      item => {
        this.recipientResponse = item;
        console.log('item', item);
        this.loading = false;
        this.transactions.recipient_name = this.recipientResponse.recipient_name;

      },
      errorResponse => {
        this.loading = false;
        this.errorMessage = errorResponse;
        console.log(this.errorMessage.error.message);
        this._snackbar.open(this.errorMessage.error.message, "okay");
        if (this.errorMessage.error.message == 'jwt expired') {
          this.router.navigate(['sign-in']);
        }
      });
  }

  transferMoney() {
    this.transferloading = true;
    this.transactions.recipient_id = this.recipientResponse.recipient_id;
    this.transactions.sender_acc_no = this.userProfileDetails.account_no;
    console.log('transactions', this.transactions);

    this.transactionService.transferMoney(this.transactionsPayload).subscribe(
      response => {
        this.transferloading = false;
        this.response = response;
        console.log('response', this.response);
        this._snackbar.open('Transaction Succssful', "okay");
        this.drawalStat = false;
        // this.transactions.recipient_name = this.recipientResponse.recipient_name;

      },
      errorResponse => {
        this.transferloading = false;
        this.errorMessage = errorResponse;
        console.log(this.errorMessage.error.message);
        this._snackbar.open(this.errorMessage.error.message, "okay");
        if (this.errorMessage.error.message == 'jwt expired') {
          this.router.navigate(['sign-in']);
        }
      })
  }

}
