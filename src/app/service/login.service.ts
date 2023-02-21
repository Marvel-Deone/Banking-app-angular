import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  ProceedLogin(inputdata: any) {
    return this.http.post('https://bankapi.vercel.app/api/user/login', inputdata).pipe(map(response => {
      console.log(response);
    }))
  }

  // catchAuthError(error): Observable<Response> {
  //   if (error && error.error && error.error.message) {
  //     console.log(error);

  //   }
  // }

  IsLoggegIn() {
    return localStorage.getItem('token') != null
  }

  GetToken() {
    return localStorage.getItem('token') != null ? localStorage.getItem('token') : '';
  }

  GetProfile() {

  }
}
