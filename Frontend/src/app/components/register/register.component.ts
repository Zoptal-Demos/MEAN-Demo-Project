import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  hideloader : boolean = true;

  registerFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private service: DataService, private snackBar: MatSnackBar,private router : Router) { }

  ngOnInit(): void {
  }

  // spaceGuard(input:any){
  //   let values = [];
  //   Object.keys(this.registerFormGroup.controls).forEach((element)=>{
  //     console.log(this.registerFormGroup.value)
  //   })
  // }

  register(){
    this.hideloader = false;
    this.service.register({ ...this.registerFormGroup.value, role: "ADMIN",deviceToken : "THISISMYAGENCY", deviceType : "WEB",appVersion : "2.0", deviceModal : "UBUNTU 22.02 LTS"}).subscribe((res: any) => {
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