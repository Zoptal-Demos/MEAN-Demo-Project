import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchicon',
  templateUrl: './searchicon.component.html',
  styleUrls: ['./searchicon.component.css']
})
export class SearchiconComponent implements OnInit {

  @Input() text : string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
