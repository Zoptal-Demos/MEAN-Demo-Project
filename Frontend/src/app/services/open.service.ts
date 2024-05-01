import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenService {

  openedData : any;
  chatScreenData : any;

  constructor() { }

  setData(data:any){
    this.openedData = data;
    return true;
  }

  getData(){
    return this.openedData;
  }

  setChatData(data:any){
    this.chatScreenData = data
    return true
  }

  getChatData(){
    return this.chatScreenData;
  }

}