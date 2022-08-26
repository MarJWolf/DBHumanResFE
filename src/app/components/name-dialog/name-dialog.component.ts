import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendService} from "../../services/backend.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.css']
})
export class NameDialogComponent implements OnInit {

  nameFC = new FormControl("",[Validators.required])

  constructor(public dialogRef: MatDialogRef<NameDialogComponent>, public backendService: BackendService,
              @Inject(MAT_DIALOG_DATA) public data: {type: boolean}) { }

  ngOnInit(): void {
  }

  onOKClick(){
    if(this.nameFC.valid){
      if(this.data && this.data.type){
        this.backendService.createWorkplace(this.nameFC.value).subscribe(
          () =>{
            location.reload();
          }
        );
      }else if(this.data && !this.data.type){
        this.backendService.createJobTitle(this.nameFC.value).subscribe(
          () =>{
            location.reload();
          }
        );
      }
      this.dialogRef.close(true);
    }else{
      this.nameFC.markAsTouched();
    }
  }
}
