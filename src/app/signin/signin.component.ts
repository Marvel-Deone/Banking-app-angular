import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public hide: boolean = true;
  constructor(private fb: FormBuilder, private service: UserService, private router: Router, private _snackBar: MatSnackBar) { }
  public loginForm?: any;

  durationInSeconds = 5;
  loading = false;
  errorResp?: any;
  errorMessage?: any;


  respData?: any
  respDataToken?: any
  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  matcher = new MyErrorStateMatcher();
  onSubmit(form: FormGroup) {
    this.loading = true;
    // console.log('Valid?', form.valid); // true or false
    console.log(form.value);
    this.service.Login(form.value).subscribe(
      item => {
        this.loading = false;
        this.respData = item;
        this._snackBar.open("Login successful", "okay");
        this.router.navigate(['user/dashboard']);
      },
      errorResponse => {
        this.loading = false;
        this.errorMessage = errorResponse.error.message;
        this.errorMessage ? this._snackBar.open(this.errorMessage, "okay") : this._snackBar.open("Pls check your internet connection", "okay");
        console.log(errorResponse);
        form.reset();
      });

  }

}
