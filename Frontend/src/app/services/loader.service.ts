import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private emitChangeSource = new Subject<any>();

  changeEmitted$ = this.emitChangeSource.asObservable();

  hideLoader(data: any) {
      this.emitChangeSource.next(data);
  }
  
}