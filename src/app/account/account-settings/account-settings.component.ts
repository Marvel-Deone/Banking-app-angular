import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  status: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  setStatus() {
    this.status = !this.status;
  }

}
