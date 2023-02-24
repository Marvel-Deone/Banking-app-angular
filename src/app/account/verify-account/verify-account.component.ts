import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  loading: boolean = false;
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
  userProfile: any;
  errorMessage: any;
  verification_code: boolean = false;

  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];

  @ViewChildren('formRow') rows: any;
  form: any;
  myarr: [] = [];
  sentOtpResp: any;

  constructor(private auth: UserService, private router: Router) {
    this.form = this.toFormGroup(this.formInput);
  }

  ngOnInit(): void {
    this.auth.GetProfile().subscribe(
      item => {
        this.userProfile = item.profile;
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

  }

  toFormGroup(elements: any) {
    console.log('element', typeof (elements));
    this.myarr = elements;

    const group: any = {};
    this.myarr.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }


  sendOtp() {
    this.loading = true;
    let userEmail = { email: this.userProfileDetails.email }
    this.auth.SendOtp(userEmail).subscribe(
      response => {
        const resp = response;
        this.sentOtpResp = resp
        if (this.sentOtpResp.message == "OTP sent to your mail") {
          this.loading = false;
          this.verification_code = true;
          console.log('resp', resp);
        } else {
          this.loading = false;
          this.verification_code = false;
          console.log('resp', resp);
        }
      },
      errorResponse => {
        this.loading = false;
        this.errorMessage = errorResponse;
        console.log(this.errorMessage);

      })
  }

  onSubmit() {
    console.log('myForm', this.form.value);

  }

  keyUpEvent(event: any, index: number) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

}
