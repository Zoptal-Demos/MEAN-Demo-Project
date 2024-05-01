import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordFormGroup = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    confirm_password: new FormControl('', [Validators.required])
  });
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  hideloader : boolean = true;
  TOKEN : any = localStorage.getItem('token') ?? '';

  constructor(private service: DataService, private snackBar: MatSnackBar,private router : Router) { 

  }

  ngOnInit(): void {
  }

  changePassword(){
    this.hideloader = false;
    this.service.changePassword({password : this.passwordFormGroup.value.password,currentPassword : this.passwordFormGroup.value.currentPassword},this.TOKEN).subscribe((res: any) => {
      this.hideloader = true;
      if(res.status){
        this.openSnackBar(res.message,true);
        this.router.navigate(['dashboard', 
        { outlets: { 'dashboard': ['profile']}}]);
      }else{
        this.openSnackBar(res.message,false);
        if(res.code == 203){
          this.service.logout();
        }
      }
      
    },(err:any)=>{
      this.hideloader = true;
      this.openSnackBar(err.message,false);
    })
  }

  confirmPassword() {
    return (this.passwordFormGroup.value.password !== this.passwordFormGroup.value.confirm_password);
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