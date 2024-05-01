import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  hideloader : boolean = true;

  forgotPasswordGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private service: DataService, private snackBar: MatSnackBar,private router : Router) { }

  ngOnInit(): void {
  }

  login() {
    this.hideloader = false;
    this.service.forgotPassword(this.forgotPasswordGroup.value).subscribe((res: any) => {
      this.hideloader = true;
      if(res.status){

        this.openSnackBar(res.message,true);
        this.router.navigate(['/login']);
      }else{
        this.openSnackBar(res.message,false);
      }
      
    },(err:any)=>{
      this.hideloader = true;
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

}