import {Component, Input, OnInit} from '@angular/core';


export type colorType = "Vacation" |"Non-Working Day" |"Sickness" |"Maternity/Paternity"|"none";

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
    "Vacation": "red",
    "Non-Working Day": "cyan",
    "Sickness":"yellow",
    "Maternity/Paternity":"purple",
    "none":"none",
  }

  constructor() { }

  ngOnInit(): void {
  }

}
