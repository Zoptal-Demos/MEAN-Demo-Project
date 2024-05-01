import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  
// import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // socket : any;

  constructor(public http: HttpClient,private socket : Socket) {
    console.log(this.socket," this is my socket")
  }

  // constructor(public http: HttpClient) {
  //   this.socket = io('http://localhost:5011/');
  //   console.log(this.socket," this is my socket")
  // }

  listen(eventName: string) {
    return this.socket.fromEvent(eventName);
  }

  emit(eventName: string, obj: any,callback:any) {
    this.socket.emit(eventName, obj,(res:any)=>{
      callback(res);
    });
  }

}