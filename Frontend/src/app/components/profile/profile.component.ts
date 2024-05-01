import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  agencyName : any = "";
  email : any = "";
  plan : any = "";
  expiryDate : any = "";
  data : any = null;
  imagePath : any = "";
  id : any = "";
  TOKEN : any = localStorage.getItem('token') ?? '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private loaderservice: LoaderService, private snackBar: MatSnackBar, private service: DataService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
  this.data = localStorage.getItem('result');
  this.data = JSON.parse(this.data);
  this.agencyName = this.data.name;
  this.email = this.data.email;
  this.imagePath = this.service.IMAGE_URL+this.data.profilePic;
  this.id = this.data._id
  if(this.data.purchaseType != ''){
    switch(parseInt(this.data.purchaseType)){
      case 1:
        this.plan = "BASIC";
        break;
      case 2:
        this.plan = "STANDARD";
        break;
      case 3:
        this.plan = "PREMIUM";
        break;
    }
  }else{
    this.plan = 'FREE TRIAL';
  }
  let time = parseInt(this.data.expiryTime+"000");
  this.expiryDate = moment(time).calendar();
  if(this.expiryDate == '01/01/1970'){
    this.expiryDate = '';
  }
  }

  onFileSelect(event: any) {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }).then((res:any)=>{
      this.imagePath = res;
      let formData = new FormData();
      formData.append('file',event.target.files[0]);
      formData.append('user_id',this.id);
      formData.append('upload_type','1');
      this.uploadPhoto(formData);
    }).catch((err:any)=>{
      console.log("error is ",err.message)
    })
  }

  uploadPhoto(body:any) {
    this.loaderservice.hideLoader(false);
    this.service.uploadPic(body,this.TOKEN).subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      if (res.status) {
        this.openSnackBar(res.message,true);
        if(this.data != null){
          this.data.profilePic = res.result.image_url;
          localStorage.setItem('result',JSON.stringify(this.data))
        }
      } else {
        this.loaderservice.hideLoader(true);
        this.openSnackBar(res.message, false);
        if(res.code == 203){
          this.service.logout();
        }
      }

    }, (err: any) => {
      this.loaderservice.hideLoader(true);
      this.openSnackBar(err.message, false);
    })
  }

  openSnackBar(message: string, type: boolean) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: [type ? 'success-snackbar' : 'error-snackbar']
    });
  }

}
