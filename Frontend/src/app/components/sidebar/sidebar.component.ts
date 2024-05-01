import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  @ViewChild("myNameElem") myNameElem: any;
  isHide : boolean = false;

  ngOnInit(): void {
  }

  opener(){
    let element = this.myNameElem._elementRef.nativeElement.innerHTML
    if(element == 'keyboard_arrow_right'){
      this.myNameElem._elementRef.nativeElement.innerHTML = 'keyboard_arrow_down';
      this.isHide = false;
    }else{
      this.myNameElem._elementRef.nativeElement.innerHTML = 'keyboard_arrow_right';
      this.isHide = true;
    }
  }

}
