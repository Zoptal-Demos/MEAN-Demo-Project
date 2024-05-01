import { Component, OnInit } from '@angular/core';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },{
      name: 'Work',
      updated: new Date('1/28/16'),
    },{
      name: 'Work',
      updated: new Date('1/28/16'),
    },{
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];

}
