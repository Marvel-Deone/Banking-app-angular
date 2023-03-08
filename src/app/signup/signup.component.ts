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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: UserService, private router: Router, private _snackbar: MatSnackBar) { }

  public signupForm?: any;
  public hide: boolean = true;
  public hideConfirm: boolean = true;
  public respdata?: any;
  public sendOtpdata?: any;
  loading = false;
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      confirmpassword: ['', Validators.required,],
    },
      {
        validators: this.pwrdMatch('password', 'confirmpassword')
      }
    );
  }

  get signup() { return this.signupForm.controls };

  pwrdMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors?.['pwrdMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ pwrdMatch: true });
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  matcher = new MyErrorStateMatcher();
  onSubmit(form: FormGroup) {
    this.loading = true;
    // console.log('Valid?', form.valid); // true or false
    console.log(form.value);
    this.service.Register(form.value).subscribe(item => {
      this.respdata = item;
      this._snackbar.open("Registration Successful", "X");
      this.router.navigate(['sign-in']);
      this.loading = false;
    },
      errorResponse => {
        this.loading = false;
        console.log('Registration Failed', this.respdata);
        this._snackbar.open("Registration Failed", "X");
      })
  }
}
