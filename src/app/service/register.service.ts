import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {

  }

  Registration(inputdata: any) {
    return this.http.post('https://bankapi.vercel.app/api/user/register', inputdata)
  }

  SendOtp(userEmail: any) {
    return this.http.post('https://bankapi.vercel.app/api/user/send_otp', userEmail)
  }
}
