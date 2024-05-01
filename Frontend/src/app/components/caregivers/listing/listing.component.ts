import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OpenService } from 'src/app/services/open.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  hideloader : boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  caregivers : any[] = [];
  tempString : any = localStorage.getItem('result');
  tempData : any = JSON.parse(this.tempString);
  imgageUrl : string = this.service.IMAGE_URL
  TOKEN : any = localStorage.getItem('token') ?? '';
  
  constructor(private openservice : OpenService,private loaderservice: LoaderService,private router : Router,private service : DataService,private snackBar : MatSnackBar) { }
  
  ngOnInit(): void {
    
    this.getCaregivers();
  }

  getCaregivers(){
    this.loaderservice.hideLoader(false);
    this.service.getCaregivers(this.TOKEN).subscribe((res:any)=>{
      this.loaderservice.hideLoader(true);
      if(res.status){
        this.caregivers = res.data.filter((element:any)=>{return element.agency_name === this.tempData._id})
      }else{
        this.loaderservice.hideLoader(true);
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

  chooseItem(myitem:string){
    const selectedData = this.caregivers.filter((element:any)=>{return element._id === myitem});
    this.openservice.setData(selectedData[0]);
    this.router.navigate(['dashboard', 
    { outlets: { 'dashboard': ['detail',myitem] } }])
  }

  addCaregiver(){
    this.router.navigate(['dashboard', 
    { outlets: { 'dashboard': ['add'] } }])
  }

  openSnackBar(message:string,type:boolean){
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: [type ? 'success-snackbar' : 'error-snackbar']
    });
  }

  createStars(limit:any){
    let left = 5-limit;
    let temp : any[] = [];
    for(let i=0;i<5;i++){
      if(i<left){
        temp.push(false);
      }else{
        temp.push(true);
      }
    }
    return temp;
  }

}