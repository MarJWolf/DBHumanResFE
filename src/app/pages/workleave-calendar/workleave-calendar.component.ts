import {Component, OnInit} from '@angular/core';
import {CalendarData, CalendarDTO, CalendarUser, CalendarWorkLeave, Type} from "../../interfaces/workleave";
import {BackendService} from "../../services/backend.service";
import {colorType} from "../../components/calendar-cell/calendar-cell.component";
import {MatTabChangeEvent} from "@angular/material/tabs";


@Component({
  selector: 'app-workleave-calendar',
  templateUrl: './workleave-calendar.component.html',
  styleUrls: ['./workleave-calendar.component.css']
})
export class WorkleaveCalendarComponent implements OnInit {
  months = [
    {name: "Януари", num: 0},
    {name: "Февруари", num: 1},
    {name: "Март", num: 2},
    {name: "Април", num: 3},
    {name: "Май", num: 4},
    {name: "Юни", num: 5},
    {name: "Юли", num: 6},
    {name: "Август", num: 7},
    {name: "Септември", num: 8},
    {name: "Октомври", num: 9},
    {name: "Ноември", num: 10},
    {name: "Декември", num: 11}
  ]
  currentDate = new Date()

  constructor(private backendService: BackendService) {
  }

  years: number[] = Array.from({length: 50}, (_, i) => (new Date()).getFullYear() - i);
  monthDays: number[] = Array.from({length: 31}, (_, i) => (i + 1));
  calendarDTO?: CalendarDTO[];
  headerNames = ["Месторабота", "Имена", ...this.monthDays.map(value => String(value)), "Отсъстващи дни"];
  selectedYear = this.currentDate.getFullYear();
  selectedMonth: number = this.currentDate.getMonth();

  ngOnInit(): void {
    this.getCalendarData(this.selectedYear, this.selectedMonth+1);
  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.getCalendarData(this.selectedYear, 1);
    this.selectedMonth = 0;
  }

  getCellType(day: number, user: CalendarDTO): colorType {
      if (this.calendarDTO && user && user.days) {
        const key = this.selectedYear + '-' + String(this.selectedMonth+1).padStart(2, '0') + '-' +  String(day).padStart(2, '0')
        return user.days[key];
      }
    return "none";
  }
  getCalendarData(year: number, month: number) {
    this.backendService.getCalendarData(year, month).subscribe(value => {
      this.calendarDTO = value
    })
  }

  getDayOfWeek(num: number, day: number) {
    return new Date(this.selectedYear,num,day).toLocaleString('bg', {  weekday: 'short' })
  }

  onTabChanged(tab: MatTabChangeEvent) {
    this.selectedMonth = tab.index;
    this.getCalendarData(this.selectedYear, this.selectedMonth + 1)
  }
}
