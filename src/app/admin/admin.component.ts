import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }
  adminHeader = "My ANgular Practice";
  salary = 3000;
  isDisabled = false;
  colorName = 'red';
  fontSize = '20px';
  className = 'text-blue-500 font-semibold'
  styleValue = {
    "color": 'blue',
    "font-size": '20px',
    "align-items": 'center'
  }

  ngOnInit(): void {
  }
  clickMe(name: string) {
    alert(name)
  }

}
