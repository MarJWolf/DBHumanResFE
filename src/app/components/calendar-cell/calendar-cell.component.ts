import {Component, Input, OnInit} from '@angular/core';


export type colorType = "Paid" |"NonWorkingDay" | "Holiday" | "Sickness" |"Maternity"|"Unpaid"|"none";

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.css']
})
export class CalendarCellComponent implements OnInit {



  @Input()
  type?:colorType;
  @Input()
  text?:string;

  colors = {
    "Paid": "red",
    "NonWorkingDay": "cyan",
    "Holiday": "blue",
    "Sickness":"yellow",
    "Maternity":"purple",
    "Unpaid":"grey",
    "none":"white",
  }

  constructor() { }

  ngOnInit(): void {
  }

}
