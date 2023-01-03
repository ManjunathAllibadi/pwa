import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit{

  constructor(public dialogRef : MatDialogRef<UpdateDialogComponent>, ){}

  ngOnInit(): void {

  }

  onNoClick(){
    this.dialogRef.close();

  }

  onOkClick(){

    window.location.reload();
    this.dialogRef.close();

  }

}
