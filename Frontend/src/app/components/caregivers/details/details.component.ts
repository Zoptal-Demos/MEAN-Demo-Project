import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OpenService } from 'src/app/services/open.service';

export interface Model {
  name: string;
  description: string;
  experience: string;
  age: string;
  gender: Number;
  agency_name: any;
  work_address_name: string;
  pets_comfortable: boolean;
  willing_to_drive: boolean;
  non_smoker: boolean;
  transportation: boolean;
  disablities_care: any;
  hours_per_week: string;
  avgRating: Number;
  profilePic: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  id: any;
  details: Model = {
    name: "",
    description: "",
    experience: "",
    age: "",
    gender: 1,
    agency_name: "",
    work_address_name: "",
    pets_comfortable: false,
    willing_to_drive: false,
    non_smoker: false,
    profilePic: '',
    transportation: false,
    disablities_care: "",
    hours_per_week: "",
    avgRating: 0
  };
  imagepath: string = '../../../../assets/avatar.svg';
  disabilities: any[] = [];
  availabilities: any[] = [];
  cares: any[] = [];
  stars: any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  imgageUrl: string = this.service.IMAGE_URL
  TOKEN : any = localStorage.getItem('token') ?? '';

  constructor(private loaderservice: LoaderService, private snackBar: MatSnackBar, private service: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    });
    this.careGiverDetails();
  }

  rateAndReview() {
    this.router.navigate(['dashboard',
      { outlets: { 'dashboard': ['rate', this.id] } }])
  }

  editProfile() {
    this.router.navigate(['dashboard',
      { outlets: { 'dashboard': ['edit-profile', this.id] } }])
  }

  careGiverDetails() {
    this.loaderservice.hideLoader(false);
    this.service.getCarefiverDetails(this.id,this.TOKEN).subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      if (res.status) {
        this.details = res.result;
        this.imagepath = res.result.profilePic != '' ? this.imgageUrl + res.result.profilePic : '../../../../assets/avatar.svg'
        this.disabilities = this.extractor(res.result.disablities_care);
        this.availabilities = this.extractor(res.result.availability);
        this.cares = this.extractor(res.result.type_and_care);
        this.stars = this.createStars(res.result.avgRating);
      } else {
        this.loaderservice.hideLoader(true);
        this.openSnackBar(res.message, false);
        if(res.code == 203){
          this.service.logout();
        }
      }

    }, (err: any) => {
      this.loaderservice.hideLoader(true);
      this.openSnackBar(err.message, false);
    })
  }

  uploadPhoto(body:any) {
    this.loaderservice.hideLoader(false);
    this.service.uploadPic(body,this.TOKEN).subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      if (res.status) {
        this.openSnackBar(res.message,true);
        this.careGiverDetails();
      } else {
        this.loaderservice.hideLoader(true);
        this.openSnackBar(res.message, false);
        if(res.code == 203){
          this.service.logout();
        }
      }

    }, (err: any) => {
      this.loaderservice.hideLoader(true);
      this.openSnackBar(err.message, false);
    })
  }

  onFileSelect(event: any) {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }).then((res:any)=>{
      this.imagepath = res;
      let formData = new FormData();
      formData.append('file',event.target.files[0]);
      formData.append('user_id',this.id);
      formData.append('upload_type','1');
      this.uploadPhoto(formData);
    }).catch((err:any)=>{
      console.log("error is ",err.message)
    })
  }

  openSnackBar(message: string, type: boolean) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: [type ? 'success-snackbar' : 'error-snackbar']
    });
  }

  extractor(data: any) {
    let temp: any[] = [];
    data.forEach((element: any) => {
      temp.push(element)
    });
    return temp;
  }

  createStars(limit: any) {
    let left = 5 - limit;
    let temp: any[] = [];
    for (let i = 0; i < 5; i++) {
      if (i < left) {
        temp.push(false);
      } else {
        temp.push(true);
      }
    }
    return temp.reverse();
  }

}