import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';


export interface Details {
  createdBy: createdBy;
  title: string;
  description: string;
  startDate : string;
  endDate: string;
  fromTime: string;
  toTime: string;
  address: string;
  weekSchedule: string;
}

export interface createdBy {
  name: string;
  email: string;
  profilePic: string;
  _id : string;
}

@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.component.html',
  styleUrls: ['./searchdetails.component.css']
})

export class SearchdetailsComponent implements OnInit {

  id: any;
  imagePath : string = this.service.IMAGE_URL
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  details: Details = {
    createdBy: {
      name: '',
      email: '',
      profilePic: '',
      _id : ''
    },
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    fromTime: '',
    toTime: '',
    address: '',
    weekSchedule: ''
  }
  selected : boolean = false;
  tempdet : any;
  TOKEN : any = localStorage.getItem('token') ?? '';

  constructor(private dialog: MatDialog, private loaderservice: LoaderService, private router: Router, private service: DataService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    });
    this.jobDetails();
  }

  jobDetails() {
    this.loaderservice.hideLoader(false);
    this.service.jobDetails(this.id,this.TOKEN).subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      if (res.status) {
        this.details = res.result;
        console.log(this.details, " ", res.result)
      } else {
        this.openSnackBar(res.message, false);
      }

    }, (err: any) => {
      this.loaderservice.hideLoader(true);
      this.openSnackBar(err.message, false);
    })
  }

  selection(event:any){
    this.selected = this.selected ? false : true
  }

  gotoChat(){
    this.tempdet = localStorage.getItem('result');
    this.tempdet = JSON.parse(this.tempdet);
    this.router.navigate(['dashboard',
      { outlets: { 'dashboard': ['chat', this.tempdet._id,this.details.createdBy._id,this.tempdet._id] } }])
  }

  openSnackBar(message: string, type: boolean) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: [type ? 'success-snackbar' : 'error-snackbar']
    });
  }

  createTags(number:Number){
    let tags = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    let returnarr = []
    for(let i=0;i<number;i++){
      returnarr.push(tags[i])
    }
    return returnarr
  }

}