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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  hideloader : boolean = true;

  inputFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private service: DataService, private snackBar: MatSnackBar,private router : Router) { }

  ngOnInit(): void {
  }

  login() {
    this.hideloader = false;
    this.service.login({ ...this.inputFormGroup.value, role: "ADMIN",deviceToken : "THISISMYAGENCY", deviceType : "WEB",appVersion : "2.0", deviceModal : "UBUNTU 22.02 LTS"}).subscribe((res: any) => {
      this.hideloader = true;
      if(res.status){
        let string = JSON.stringify(res.result);
        localStorage.setItem('token',res.result.accessToken);
        localStorage.setItem('result',string);
        this.openSnackBar(res.message,true);
        this.router.navigate(['dashboard', 
        { outlets: { 'dashboard': ['profile']}}]);
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