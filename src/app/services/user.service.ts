import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  tokenMessage?: any;
  respObj?: {};
  token?: any
  userProfile?: any;
  id?: any;
  public header?: any;
  user_token?: any;

  private uriseg = environment.baseUrl;

  constructor(private http: HttpClient) { }

  Login(inputdata: any) {
    const URI = this.uriseg + '/user/login';

    return this.http.post(URI, inputdata).pipe(map(response => {
      console.log(response);
      localStorage.setItem('token', JSON.stringify(response));
    }));
  }

  IsLoggedIn() {
    return localStorage.getItem('token') != null
  }

  GetToken() {
    if (localStorage.getItem('auth_tkn')) {
      localStorage.getItem('auth_tkn') != null ? localStorage.getItem('auth_tkn') : '';
    }

    return this.token = localStorage.getItem('auth_tkn');
  }

  // Register(inputdata: any) {
  //   const URI = this.uriseg + '/user/register';
  //   return this.http.post(URI, inputdata).pipe(map(response => {
  //     console.log("Register", response);
  //   }));

  // }

  Register(inputdata: any) {
    const URI = this.uriseg + '/user/register';

    return this.http.post(URI, inputdata).pipe(map(response => {
      console.log(response);
    }));
  }

  GetProfile() {
    const URI = this.uriseg + '/user/profile';
    this.user_token = localStorage.getItem('auth_tkn');
    const token = this.user_token.replace(/['"]+/g, '');
    console.log('user_token', token);

    this.header = { headers: { Authorization: `${token}` } };

    console.log('token', token, this.header);
    return this.http.get(URI, this.header).pipe(map(response => {
      console.log("Profile", response);
      this.userProfile = response;
      return this.userProfile;
    }));

  }

  UpdateProfile(inputdata: any) {
    const URI = this.uriseg + '/user/updateProfile'
    return this.http.get(URI, inputdata).pipe(map(response => {
      return response;

    }));
  }

}
