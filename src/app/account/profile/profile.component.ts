import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayTitle: any = 'account_information';
  imgname?: any;
  imagefile?: any;
  profileImage?: any;
  profileForm?: any;
  account_no: any;
  userProfile: any;
  errorMessage: any;
  username: any;
  email: any;
  phone_number: any;
  dob: any;
  country: any;
  state: any;
  address: any;
  gender: any;
  first_name: any;
  last_name: any;

  public profile = {
    id: '',
    country: '',
    dob: '',
    email: '',
    first_name: 'Folajimi',
    gender: '',
    geo_political_zone: '',
    home_address: '',
    image: '',
    last_name: 'Adedolapo',
    lga: '',
    middle_name: '',
    phone_number: '',
    pin: '',
    state_of_residence: '',
    status: '',
    state: '',
    username: '',
    account_no: 0,
    address: '',
  }

  constructor(private fb: FormBuilder, private service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: ['Folajimi', [Validators.required]],
      last_name: ['Folajimi', [Validators.required]],
      phone_number: ['07048502396', [Validators.required]],
      state: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      country: ['Nigeria', [Validators.required]],
      address: ['Ogbomos, Oyo STate, Nigeria', [Validators.required]],
      gender: ['', [Validators.required]],
    });

    this.service.GetProfile().subscribe(
      item => {
        this.userProfile = item.profile;
        console.log(this.userProfile.username);
        this.profile.username = this.userProfile.username;
        this.profile.account_no = this.userProfile.account_no;
        this.profile.email = this.userProfile.email;
        this.profile.phone_number = this.userProfile.phone_number;
        this.profile.dob = this.userProfile.phone_number;
        this.profile.country = this.userProfile.country;
        this.profile.state = this.userProfile.state;
        this.profile.address = this.userProfile.address;
        this.profile.gender = this.userProfile.gender;
        // this.profile.first_name = this.userProfile.first_name;
        // this.profile.last_name = this.userProfile.last_name;
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
    )
  }

  changeDisplay(title: any) {
    this.displayTitle = title;
  }
  loadImage(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files[0];
      this.imgname = files.name;
      const reader = new FileReader();

      reader.onloadend = () => {
        this.imagefile = reader.result;

        this.profileImage = '' + this.imagefile;
      };
      reader.readAsDataURL(files)

    } else {
      console.log('Waiting');

    }
  }
  onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false
    console.log(form.value);

  }

  // profileForm()

}
