import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public status: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.status = !this.status
  }
  hide() {
    this.status = false;
  }

}
