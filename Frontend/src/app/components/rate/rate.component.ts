import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import * as $ from 'jquery';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';

export interface DialogData{
  user_id : string;
}

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})

export class RateComponent implements OnInit {

  rating : Number = 1
  TOKEN : any = localStorage.getItem('token') ?? '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  id : string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private dialogRef : MatDialogRef<RateComponent>,private service: DataService, private loaderservice: LoaderService,private snackBar: MatSnackBar) { }

  rateControl = new FormControl('');

  ngOnInit(): void {
    this.id = this.data.user_id
  }

  selectRating(number:any){
    this.rating = number;
    for(let i=1;i<=number;i++){
      this.fillStar(''+i);
    }
    for(let i=number+1;i<=5;i++){
      this.borderStar(''+i);
    }
  }

  fillStar(id:string){
    $('#'+id).text('star')
  }

  borderStar(id:string){
    $('#'+id).text('star_border')
  }

  submitReview(){
    this.loaderservice.hideLoader(false);
    this.service.rateNow({rating : this.rating,review : this.rateControl.value,user_id:this.id},this.TOKEN).subscribe((res:any)=>{
      this.loaderservice.hideLoader(true);
      if(res.status){
        this.openSnackBar(res.message,true);
        this.closeDialog();
      }else{
        this.openSnackBar(res.message,false);
      }
    },(err:any)=>{
      this.loaderservice.hideLoader(true);
      this.openSnackBar(err.message,false);
    })
  }

  openSnackBar(message:string,type:boolean){
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: [type ? 'success-snackbar' : 'error-snackbar']
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
