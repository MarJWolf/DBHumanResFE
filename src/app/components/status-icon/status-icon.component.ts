import {Component, Input, OnInit} from '@angular/core';
import {Status, statusTranslation} from "../../interfaces/workleave";

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.css']
})
export class StatusIconComponent implements OnInit {

  @Input()
  status?: Status
  translatedStatus? : string;
  constructor() { }

  ngOnInit(): void {
    if(this.status)
    {
      this.translatedStatus = statusTranslation[this.status];
    }
  }

}
