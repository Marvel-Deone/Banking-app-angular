import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private uriseg = environment.baseUrl;
  public header: any;
  user_token: any;

  constructor(private http: HttpClient) { }

  VerifyReceiptAccNo(inputdata: any) {
    const URI = this.uriseg + '/user/find_recipient';
    this.user_token = localStorage.getItem('auth_tkn');
    const token = this.user_token.replace(/['"]+/g, '');
    this.header = { headers: { Authorization: `${token}` } };
    return this.http.post(URI, inputdata, this.header).pipe(map(response => {
      return response;
    }));
  }

  transferMoney(inputdata: any) {
    const URI = this.uriseg + '/user/transfer';
    this.user_token = localStorage.getItem('auth_tkn');
    const token = this.user_token.replace(/['"]+/g, '');
    this.header = { headers: { Authorization: `${token}` } };
    return this.http.post(URI, inputdata, this.header).pipe(map(response => {
      return response;
    }));
  }

  FetchTransactions(inputdata: any) {
    const URI = this.uriseg + '/user/fetch_transaction';
    this.user_token = localStorage.getItem('auth_tkn');
    const token = this.user_token.replace(/['"]+/g, '');
    this.header = { headers: { Authorization: `${token}` } };
    return this.http.post(URI, inputdata, this.header).pipe(map(response => {
      return response;
    }));
  }
}
