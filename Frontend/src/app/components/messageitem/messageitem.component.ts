import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messageitem',
  templateUrl: './messageitem.component.html',
  styleUrls: ['./messageitem.component.css']
})
export class MessageitemComponent implements OnInit {
  
  @Input() align : string = '';
  @Input() message  :string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
