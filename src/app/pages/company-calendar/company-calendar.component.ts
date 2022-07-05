import {Component, OnInit} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Holiday} from "../../interfaces/user";
import {FormControl, Validators} from "@angular/forms";
import {SimpleDialogComponent} from "../../components/simple-dialog/simple-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-company-calendar',
  templateUrl: './company-calendar.component.html',
  styleUrls: ['./company-calendar.component.css']
})
export class CompanyCalendarComponent implements OnInit {
  //todo: check  Highlighting specific dates in calendar https://material.angular.io/components/datepicker/overview#datepicker-date-class
  selected: Date | null;
  holidays: Holiday[] = []
  displayedColumns: string[] = ['name', 'date', 'action'];

  holidayNameFC = new FormControl("Ден на Бащата", [Validators.required])

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

  createHoliday(holidayDate: Date | null) {
    if (this.holidayNameFC.valid && holidayDate != null) {
      this.dialog.open(SimpleDialogComponent, {
        width: 'clamp(300px,50%,500px)',
        data: {
          text: "Сигурни ли сте че искате да създадете този празник?", setResult: (result: boolean) => {
            if (result) {
              holidayDate.setHours(12);
              this.backendService.createHoliday(holidayDate,this.holidayNameFC.value).subscribe();
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
            this.backendService.deleteHoliday(id).subscribe()
          }
        }
      }
    });
  }
}
