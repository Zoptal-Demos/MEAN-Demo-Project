import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OpenService } from 'src/app/services/open.service';
import { SocketService } from 'src/app/services/socket.service';

export interface Details{
  name : string;
  email : string;
  avgRating : Number;
  profilePic : string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {

  loggedInUser: any = '';
  userId: any = '';
  caregiver: any = '';
  messages: any[] = [];
  messageControl = new FormControl('');
  result: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isAuthentic: boolean = false;
  details : Details = {
    name : '',
  email : '',
  avgRating : 0,
  profilePic : '',
  }
  TOKEN : any = localStorage.getItem('token') ?? '';


  @ViewChild('messagearea') private element : ElementRef

  constructor(private service: SocketService, private route: ActivatedRoute, private loaderservice: LoaderService, private snackBar: MatSnackBar, private openservice: OpenService,private dataservice : DataService) {
    this.service.listen('receiveMessage').subscribe((res: any) => {
      this.messages.push({ message: res.result.message, from: res.result.from })
      this.scrollBottom();
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.loggedInUser = paramMap.get('loggedin');
      this.userId = paramMap.get('userId');
      this.caregiver = paramMap.get('caregiver');
      this.fetchInfo()
    });
    
    this.result = localStorage.getItem('result');
    let data = JSON.parse(this.result);
    this.service.emit('authenticate', { accessToken: localStorage.getItem('token') }, (res: any) => {
      this.isAuthentic = res.status ? true : false;
      if (this.isAuthentic) {
        this.loaderservice.hideLoader(false);
        this.fetchMessages(0, 20);
      }
    });
  }

  fetchMessages(skip: Number, limit: Number) {
    this.loaderservice.hideLoader(false);
    this.service.emit('fetchMessages', { loggedInUser: this.loggedInUser, userId: this.userId, skip, limit, caregiver: this.caregiver }, (res: any) => {
      this.loaderservice.hideLoader(true);
      this.messages = [...this.messages, ...res.data].reverse();
      this.scrollBottom();
    })
  }

  sendMessage() {
    let message = this.messageControl.value;
    if (message != null && message != '') {
      this.messages.push({ from: { _id: this.loggedInUser }, message })
      this.service.emit('sendMessage', { from: this.loggedInUser, to: this.userId, message, caregiver: this.caregiver }, (res: any) => {
        console.log(res," message sent successfully")
      })
      this.scrollBottom();
      this.messageControl.reset();
    }
  }

  openSnackBar(message: string, type: boolean) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: [type ? 'success-snackbar' : 'error-snackbar']
    });
  }

  fetchInfo(){
    // this.loaderservice.hideLoader(false);
    this.dataservice.getInfo(this.userId,this.TOKEN).subscribe((res:any)=>{
      if(res.status){
        this.openSnackBar(res.message,true)
        this.details = res.result
      }else{
        this.openSnackBar(res.message,false)
      }
    },(err:any)=>{
      this.openSnackBar(err.message,false)
    })
  }

  scrollBottom(){
    setTimeout(()=>{
      this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight
    },100)
  }

}