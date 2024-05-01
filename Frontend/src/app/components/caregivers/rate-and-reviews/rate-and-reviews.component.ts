import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OpenService } from 'src/app/services/open.service';

@Component({
  selector: 'app-rate-and-reviews',
  templateUrl: './rate-and-reviews.component.html',
  styleUrls: ['./rate-and-reviews.component.css']
})
export class RateAndReviewsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  rating : any[] = [];
  id : any;
  imgageUrl : string = this.service.IMAGE_URL
  TOKEN : any = localStorage.getItem('token') ?? '';

  constructor( private route: ActivatedRoute,private loaderservice: LoaderService,private router : Router,private service : DataService,private snackBar : MatSnackBar) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    });
    this.getRatings();
  }

  getRatings(){
    this.loaderservice.hideLoader(false);
    this.service.getRatings(this.id,this.TOKEN).subscribe((res:any)=>{
      this.loaderservice.hideLoader(true);
      if(res.status){
        this.rating = [...res.data]
      }else{
        this.loaderservice.hideLoader(true);
        this.openSnackBar(res.message,false);
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
