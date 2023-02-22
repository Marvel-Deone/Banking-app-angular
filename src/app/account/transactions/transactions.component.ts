import { Component, OnInit } from '@angular/core';
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

  constructor(private transactionService: TransactionService) { }

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
    let recipient_acc_no = this.transactions.recipient_acc_no.toString();
    console.log(typeof (recipient_acc_no));


    this.transactionService.VerifyReceiptAccNo(this.transactions.recipient_acc_no).subscribe(
      item => {
        const response = item;
        console.log(response);

      },
      errorResponse => {
        this.errorMessage = errorResponse;
        console.log(this.errorMessage);
      })
  }

}
