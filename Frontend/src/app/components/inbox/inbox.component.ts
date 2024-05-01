import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/services/loader.service';
import { SocketService } from 'src/app/services/socket.service';
import { Router } from '@angular/router';
import { OpenService } from 'src/app/services/open.service';
import { MatDialog } from '@angular/material/dialog';
import { RateComponent } from '../rate/rate.component';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  messages: any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  result: any;
  isAuthentic: boolean = false;

  constructor(private dialog : MatDialog,private router: Router, private loaderservice: LoaderService, private service: SocketService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loaderservice.hideLoader(false);
    this.result = localStorage.getItem('result');
    let data = JSON.parse(this.result);
    this.service.emit('authenticate', { accessToken: localStorage.getItem('token') }, (res: any) => {
      this.isAuthentic = res.status ? true : false;
      if (this.isAuthentic) {
        this.service.emit('fetchInbox', {
          userId: data._id,
          skip: 0,
          limit: 100
        }, (res: any) => {
          this.loaderservice.hideLoader(true);
          console.log(res," this ")
          this.openSnackBar(res.message, res.status)
          this.messages = res.status ? [...res.data] : [];
        })
      }
    });
  }

  openChat(obj: any) {
    this.router.navigate(['dashboard',
      { outlets: { 'dashboard': ['chat', obj.loggedInUser,obj.userId,obj.caregiver] } }])
  }

  openSnackBar(message: string, type: boolean) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: [type ? 'success-snackbar' : 'error-snackbar']
    });
  }

  ratenow(uid:any){
    this.dialog.open(RateComponent,{
      data : {user_id : uid}
    }).afterClosed().subscribe((res:any)=>{
      this.ngOnInit();
    });
  }

}