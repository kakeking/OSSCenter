import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApiComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }
  goBack(): void {
    this.location.back();
  }
}
