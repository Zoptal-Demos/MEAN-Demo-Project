import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { GoogleMapComponent } from '../../google-map/google-map.component';

export interface Address{
  address_name : string;
  latitude  : Number;
  longitude : Number;
  zipcode : string;
  city : string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit, OnChanges {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  TOKEN : any = localStorage.getItem('token') ?? '';
  hideloader : boolean = true;
  @Input() res : any;
  id : any;

  registerFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    gender: new FormControl('0', Validators.required),
    bio: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    email : new FormControl('',[Validators.required,Validators.email]),
    highlights: new FormControl('')
  });
  result : any;
  agencyName : any = {
    name : '',
    id : ''
  };
  address : Address =  {
    address_name : "",
    latitude : 0,
    longitude : 0,
    zipcode : '',
    city : ''
  }

  constructor(private detector : ChangeDetectorRef,private dialog: MatDialog,private loaderservice: LoaderService,private service: DataService, private snackBar: MatSnackBar,private router : Router) { }

  ngOnInit(): void {
    if(this.res==null){
      this.result = localStorage.getItem('result');
      let data = JSON.parse(this.result);
      this.agencyName.name = data.name;
      this.agencyName.id = data._id;
    }
  }

  // spaceGuard(input:any){
  //   let values = [];
  //   Object.keys(this.registerFormGroup.controls).forEach((element)=>{
  //     console.log(this.registerFormGroup.value)
  //   })
  // }

  ngOnChanges(changes: any) {
    this.res = changes.res.currentValue;
    if(this.res != null){
      this.address = {
        longitude : this.res.work_address.coordinates[0],
        latitude : this.res.work_address.coordinates[1],
        address_name : this.res.work_address_name,
        zipcode : this.res.zipcode,
        city : this.res.city
      }
      this.registerFormGroup.patchValue({...this.res})
      this.agencyName.name = this.res.agency_name.name
      this.id = this.res.uid;
    }
    console.log(this.registerFormGroup.value," thisnoiofnodfnoinfoibndnoi")
    this.detector.detectChanges();
}

  register(){
    if(this.res==null){
      this.loaderservice.hideLoader(false);
      this.service.addCaregiver({ name : this.registerFormGroup.value.name,email : this.registerFormGroup.value.email,agencyName : this.agencyName.id, role: "EMPLOYER",isAdmin : false}).subscribe((res: any) => {
        this.loaderservice.hideLoader(true);
        if(res.status){
          this.openSnackBar(res.message,true);
          this.id = res.user_id;
          this.updatePersonalProfile();
        }else{
          this.openSnackBar(res.message,true);
          if(res.code == 203){
            this.service.logout();
          }
        }
      },(err:any)=>{
        this.loaderservice.hideLoader(true);
        this.openSnackBar(err.message,false);
      })
    }else{
      this.updatePersonalProfile();
    }
    
  }

  updatePersonalProfile() {
    delete this.registerFormGroup.value.email;
    this.service.updateProfile({...this.registerFormGroup.value,agency_name : this.agencyName.id,user_id : this.id,gender : parseInt(this.registerFormGroup.value.gender?this.registerFormGroup.value.gender:'1'), zipcode : 0 + + this.address.zipcode,address_name : this.address.address_name,latitude : this.address.latitude,longitude : this.address.longitude,city : this.address.city},this.TOKEN).subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      if(res.status){
        this.openSnackBar(res.message, true);
        this.router.navigate(['dashboard',{
          outlets : {
            'dashboard' : 'list'
          }
        }])
      }else{
        this.openSnackBar(res.message, false);
        if(res.code == 203){
          this.service.logout();
        }
      }
    },
      (err: any) => {
        this.loaderservice.hideLoader(true);
        this.openSnackBar(err.message, false);
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

  openLocationDialogue(event:any){
    const dialogRef = this.dialog.open(GoogleMapComponent);
    dialogRef.afterClosed().subscribe((res:any)=>{
      if(res != undefined){
        this.address.address_name = res.address.address_name;
        this.address.zipcode = res.address.zipcode;
        this.address.latitude = res.address.lat;
        this.address.longitude = res.address.lng;
        this.address.city = res.address.city;
      }
      console.log(this.address," this is my object")
    })
  }

  createRange(num: Number) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(i + 1);
    }
    return arr;
  }

}