import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private uriseg = environment.baseUrl;

  constructor(private http: HttpClient) {

  }

  Registration(inputdata: any) {
    return this.http.post('https://bankapi.vercel.app/api/user/register', inputdata)
  }

  SendOtp(userEmail: any) {
    return this.http.post('https://bankapi.vercel.app/api/user/send_otp', userEmail)
  }
}
