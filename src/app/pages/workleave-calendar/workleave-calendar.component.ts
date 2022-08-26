import {Component, OnInit} from '@angular/core';
import {CalendarData, CalendarUser, CalendarWorkLeave, Type} from "../../interfaces/workleave";
import {BackendService} from "../../services/backend.service";
import {colorType} from "../../components/calendar-cell/calendar-cell.component";


@Component({
  selector: 'app-workleave-calendar',
  templateUrl: './workleave-calendar.component.html',
  styleUrls: ['./workleave-calendar.component.css']
})
export class WorkleaveCalendarComponent implements OnInit {
  months = [{name: "Януари", num: 1},
    {name: "Февруари", num: 2},
    {name: "Март", num: 3},
    {name: "Април", num: 4},
    {name: "Май", num: 5},
    {name: "Юни", num: 6},
    {name: "Юли", num: 7},
    {name: "Август", num: 8},
    {name: "Септември", num: 9},
    {name: "Октомври", num: 10},
    {name: "Ноември", num: 11},
    {name: "Декември", num: 12}]

  constructor(private backendService: BackendService) {
  }

  years: number[] = Array.from({length: 50}, (_, i) => (new Date()).getFullYear() - i);
  monthDays: number[] = Array.from({length: 31}, (_, i) => (i + 1));
  calendarData?: CalendarData;
  selectedYear = new Date().getFullYear();
  headerNames = ["Месторабота", "Имена", ...this.monthDays.map(value => String(value)), "Отсъстващи дни"];

  ngOnInit(): void {
    this.getCalendarData(this.selectedYear);
    console.log(this.headerNames);

  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.getCalendarData(this.selectedYear);
  }

  getCellType(day: number, month: number, user: CalendarUser): colorType {
    if (this.calendarData) {
      const date = new Date(this.selectedYear, month, day);
      const holiday = this.calendarData.holidays.find(value => value.holiday == date);
      if (holiday || date.getDay() == 6 ||date.getDay() == 0) {
        console.log(date)
        return "Non-Working Day"
      }
      const workleave = this.getWorkleaveByDate(date, user.workLeaves)
      //todo: getWorkleave doesnt work? Rewrite
      if (workleave!= null) {
        if(workleave.type == Type.Paid || workleave.type == Type.Unpaid)
        return "Vacation";
        else if(workleave.type == Type.Special)
          return "Maternity/Paternity"
      }

    }
    return "none";
  }

  getWorkleaveByDate(date: Date, workleaves: CalendarWorkLeave[]): CalendarWorkLeave | null {
    let flag = null;
    if (workleaves) {
      workleaves.forEach(value => {
        const start = new Date(value.startDate)
        const end = new Date(value.endDate)
        if (start <= date && end >= date)
          flag = value;
      })
    }
    return flag;
  }

  getCalendarData(selectedYear: number) {
    this.backendService.getCalendarData(selectedYear).subscribe(value => {

      this.calendarData = value
      //todo: find the sum of the workleave days for each user. Might be useful to have it in the backend as well..
      //for each day in workleave, ( using getCellType u can count the otpuski)
    })
  }

}
