import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tab = 'account-settings';

  constructor() { }

  ngOnInit() {
  }

  changeTab(name) {
      this.tab = name;
  }

}
