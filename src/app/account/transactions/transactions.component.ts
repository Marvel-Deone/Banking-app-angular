import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  drawalTitle?: any;
  drawalStat?: boolean;

  public transactions = {
    recipient_acc_no: '',
    recipient_name: '',
    amount: '',
    date: '',
    status: '',
    transaction_id: '',
    sender_acc_no: '',
    sender_name: '',
    sender_id: ''
  }
  errorMessage: any;
  loading = false;
  recipientResponse?: any;

  constructor(private transactionService: TransactionService, private _snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
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

        // this._snackbar.open('Recipient Found', "okay");
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
      })
  }

}
