import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-calendar',
  templateUrl: './company-calendar.component.html',
  styleUrls: ['./company-calendar.component.css']
})
export class CompanyCalendarComponent implements OnInit {

  selected: Date | null;

  constructor() {
    this.selected = null;
  }

  ngOnInit(): void {
  }

}
