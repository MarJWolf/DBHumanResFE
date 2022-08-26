import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Holiday} from "../../interfaces/user";
import {FormControl, Validators} from "@angular/forms";
import {SimpleDialogComponent} from "../../components/simple-dialog/simple-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";

@Component({
  selector: 'app-holiday-calendar',
  templateUrl: './holiday-calendar.component.html',
  styleUrls: ['./holiday-calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HolidayCalendarComponent implements OnInit {

  selected: Date | null;
  holidays: Holiday[] = []
  returnStatement: string = ''
  displayedColumns: string[] = ['name', 'date', 'action'];

  holidayNameFC = new FormControl("", [Validators.required])

  constructor(private backendService: BackendService, public dialog: MatDialog) {
    this.selected = null;
    this.backendService.getAllHolidays().subscribe(value => {
      this.holidays = value;
    })
  }

  ngOnInit(): void {
  }

  isAdmin() {
    return this.backendService.isAdmin()
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      this.returnStatement = '';
      this.holidays.forEach((value: Holiday) => {
        const holidayDate = new Date(value.holiday)
        if (holidayDate.getFullYear() == cellDate.getFullYear() && holidayDate.getMonth() == cellDate.getMonth() && holidayDate.getDate() == cellDate.getDate()) {
          this.returnStatement = 'example-custom-date-class';
        }
      });
        return this.returnStatement;
      }
    return this.returnStatement;
  };

  createHoliday(holidayDate: Date | null) {
    if (this.holidayNameFC.valid && holidayDate != null) {
      this.dialog.open(SimpleDialogComponent, {
        width: 'clamp(300px,50%,500px)',
        data: {
          text: "Сигурни ли сте че искате да създадете този празник?", setResult: (result: boolean) => {
            if (result) {
              holidayDate.setHours(12);
              this.backendService.createHoliday(holidayDate,this.holidayNameFC.value).subscribe(
                () => location.reload()
              );
            }
          }
        }
      });
    } else {
      this.holidayNameFC.markAsTouched();
    }
  }

  deleteHoliday(id: number) {
    this.dialog.open(SimpleDialogComponent, {
      width: 'clamp(300px,50%,500px)',
      data: {
        text: "Сигурни ли сте че искате да изтриете този празник?", setResult: (result: boolean) => {
          if (result) {
            this.backendService.deleteHoliday(id).subscribe(() => location.reload())
          }
        }
      }
    });
  }
}
