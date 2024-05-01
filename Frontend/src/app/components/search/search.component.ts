import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import { GoogleMapComponent } from '../google-map/google-map.component';

export interface Section {
  name: string;
  updated: Date;
}

export interface Address{
  latitude : string;
  longitude : string;
  zipcode : string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  jobs : any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  TOKEN : any = localStorage.getItem('token') ?? '';
  
  address :  Address = {
    latitude : "",
    longitude : "",
    zipcode : ""
  }

  constructor(private dialog : MatDialog,private loaderservice: LoaderService,private router : Router,private service : DataService,private snackBar : MatSnackBar) { }
  
  ngOnInit(): void {
    // this.searchJobs();
  }

  searchJobs(){
    this.loaderservice.hideLoader(false);
    this.service.searchJobs(this.address,this.TOKEN).subscribe((res:any)=>{
      this.loaderservice.hideLoader(true);
      if(res.status){
        this.jobs = res.data;
      }else{
        this.openSnackBar(res.message,false);
        if(res.code == 203){
          this.service.logout();
        }
      }
      
    },(err:any)=>{
      this.loaderservice.hideLoader(true);
      this.openSnackBar(err.message,false);
    })
  }

  openSnackBar(message:string,type:boolean){
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: [type ? 'success-snackbar' : 'error-snackbar']
    });
  }

  chooseItem(id:any){
    this.router.navigate(['dashboard', 
    { outlets: { 'dashboard': ['searchdetails',id] } }])
  }

  openMapBox(){
    const dialogRef = this.dialog.open(GoogleMapComponent);
    dialogRef.afterClosed().subscribe((res:any)=>{
      if(res != undefined){
        this.address.zipcode = res.address.zipcode;
        this.address.latitude = res.address.lat;
        this.address.longitude = res.address.lng;
        this.searchJobs();
      }
    })
  }

}