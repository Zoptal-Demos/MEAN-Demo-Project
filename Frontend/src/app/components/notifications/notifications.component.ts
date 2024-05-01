import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/services/loader.service';


export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications : any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  TOKEN : any = localStorage.getItem('token') ?? '';

  constructor(private loaderservice: LoaderService,private service : DataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(){
    this.loaderservice.hideLoader(false);
    this.service.getNotifications(this.TOKEN).subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      if (res.status) {
        this.notifications = res.data;
        console.log(this.notifications)
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