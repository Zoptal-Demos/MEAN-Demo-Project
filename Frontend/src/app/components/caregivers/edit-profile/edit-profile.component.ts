import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import * as $ from 'jquery';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GoogleMapComponent } from '../../google-map/google-map.component';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class EditProfileComponent implements OnInit {

  id: any;
  categories: any[] = [];
  certAndExp: any[] = [];
  disabilities: any[] = [];
  experiences: any[] = [];
  availabilities: any[] = [];
  categoriesfinalarray = new Set();
  expcertfinalarray = new Set();
  disabilitiesfinalarray = new Set();
  experiencefinalarray = new Set();
  availabilityfinalarray = new Set();
  hideLoader: boolean = true;
  temp: any = null;
  TOKEN: any = localStorage.getItem('token') ?? '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';



  constructor(private dialog: MatDialog, private detector: ChangeDetectorRef, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private service: DataService, private loaderservice: LoaderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    });
    this.calling();
  }

  calling() {
    this.getCategories();
    this.experienceWithList();
    this.getDisabilities();
    this.getExperience();
    this.getAvailibility();
    this.getCaregiverDetails();
  }

  registerFormGroup2 = new FormGroup({
    pets_comfortable: new FormControl(false, [Validators.required]),
    willing_to_drive: new FormControl(false, [Validators.required]),
    transportation: new FormControl(false, [Validators.required]),
    non_smoker: new FormControl(false, [Validators.required]),
    bilingual: new FormControl(false, [Validators.required]),
    about_me: new FormControl('', [Validators.required]),
    miles: new FormControl('', [Validators.required]),
    experience: new FormControl('', [Validators.required]),
    hours_per_week: new FormControl('', [Validators.required])
  });

  getCategories() {
    this.loaderservice.hideLoader(false);
    this.service.getCategories(this.id, this.TOKEN, 'TYPE_OF_CARE').subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      if (res.status) {
        this.openSnackBar(res.message, true);
        this.categories = [...res.result.categories.TYPE_OF_CARE];
        this.detector.detectChanges();
      } else {
        this.openSnackBar(res.message, false);
        if (res.code == 203) {
          this.service.logout();
        }
      }
    },
      (err: any) => {
        this.loaderservice.hideLoader(true);
        this.openSnackBar(err.message, false);
      })
  }

  milesRange(): any {
    return ["10 ", "20 ", "30 ", "40 ", "50 ", "60 ", "70 ", "80 ", "90 ", "100 ", "110 ", "120 ", "130 ", "140 ", "150 ", "160 ", "170 ", "180 ", "190 ", "200 ", "210 ", "220 ", "230 ", "240 ", "250 ", "260 ", "270 ", "280 ", "290 ", "300 ", "310 ", "320 ", "330 ", "340 ", "350 ", "360 ", "370 ", "380 ", "390 ", "400 ", "410 ", "420 ", "430 ", "440 ", "450 ", "460 ", "470 ", "480 ", "490 ", "500 "]
  }

  getYears(): any {
    return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+10"]
  }

  openSnackBar(message: string, type: boolean) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: [type ? 'success-snackbar' : 'error-snackbar']
    });
  }

  selectedOption(event: any, id: string, type: Number) {
    console.log(id," this is id")
    if (type == 1) {
      if (this.expcertfinalarray.has(id)) {
        this.expcertfinalarray.delete(id);
      } else {
        this.expcertfinalarray.add(id);
      }
    } else if (type == 2) {
      if (this.disabilitiesfinalarray.has(id)) {
        this.disabilitiesfinalarray.delete(id);
      } else {
        this.disabilitiesfinalarray.add(id);
      }
    } else if (type == 3) {
      if (this.availabilityfinalarray.has(id)) {
        this.availabilityfinalarray.delete(id);
      } else {
        this.availabilityfinalarray.add(id);
      }
    } else if (type == 4) {
      $(`#${event}`).hasClass('selected') ? $(`#${event}`).removeClass('selected') : $(`#${event}`).addClass('selected')
      if (this.categoriesfinalarray.has(id)) {
        this.categoriesfinalarray.delete(id);
      } else {
        this.categoriesfinalarray.add(id);
      }
    }
  }

  stateChecker(value: any) {
    if (this.expcertfinalarray.has(value)) {
      return true
    } else {
      return false
    }
  }

  experienceWithList() {
    this.loaderservice.hideLoader(false);
    this.service.getCategories(this.id, this.TOKEN, 'CERT_AND_EXP').subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      this.openSnackBar(res.message, true);
      res.result.categories.CERT_AND_EXP.forEach((element: any) => {
        this.certAndExp.push({ ...element, selected: false })
      });
    },
      (err: any) => {
        this.loaderservice.hideLoader(true);
        this.openSnackBar(err.message, false);
      })
  }

  getDisabilities() {
    this.loaderservice.hideLoader(false);
    this.service.getCategories(this.id, this.TOKEN, 'DISABILITIES_AND_CARE').subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      this.openSnackBar(res.message, true);
      this.disabilities = [...res.result.categories.DISABILITIES_AND_CARE];
    },
      (err: any) => {
        this.loaderservice.hideLoader(true);
        this.openSnackBar(err.message, false);
      })
  }

  getExperience() {
    this.loaderservice.hideLoader(false);
    this.service.getCategories(this.id, this.TOKEN, 'EXPERIENCE_WITH_AGE').subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      this.openSnackBar(res.message, true);
      this.experiences = [...res.result.categories.EXPERIENCE_WITH_AGE];
    },
      (err: any) => {
        this.loaderservice.hideLoader(true);
        this.openSnackBar(err.message, false);
      })
  }

  getAvailibility() {
    this.loaderservice.hideLoader(false);
    this.service.getCategories(this.id, this.TOKEN, 'AVAILABILITY').subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      this.openSnackBar(res.message, true);
      this.availabilities = [...res.result.categories.AVAILABILITY];
    },
      (err: any) => {
        this.loaderservice.hideLoader(true);
        this.openSnackBar(err.message, false);
      })
  }

  getCaregiverDetails() {
    this.loaderservice.hideLoader(false);
    this.service.getCarefiverDetails(this.id, this.TOKEN).subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      if (res.status) {
        this.temp = { ...res.result, gender: res.result.gender + '' };
        this.temp.uid = this.id;
        this.registerFormGroup2.patchValue({ ...res.result });
        res.result.type_and_care.forEach((element: any) => {
          this.categoriesfinalarray.add(element._id)
        });
        res.result.exp_cert.forEach((element: any) => {
          this.expcertfinalarray.add(element._id)
        });
        res.result.disablities_care.forEach((element: any) => {
          this.disabilitiesfinalarray.add(element._id)
        });
        res.result.availability.forEach((element: any) => {
          this.availabilityfinalarray.add(element._id)
        });
      } else {
        this.loaderservice.hideLoader(true);
        this.openSnackBar(res.message, false);
      }

    }, (err: any) => {
      this.loaderservice.hideLoader(true);
      this.openSnackBar(err.message, false);
    })
  }

  createRange(num: Number) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(i + 1);
    }
    return arr;
  }

  updatePersonalProfile2() {
    let obj = {
      "user_id": this.id,
      "bilingual": this.registerFormGroup2.value.bilingual,
      "about_me": this.registerFormGroup2.value.about_me,
      "type_and_care": this.stringGenerater(this.categoriesfinalarray),
      "pets_comfortable": this.registerFormGroup2.value.pets_comfortable,
      "non_smoker": this.registerFormGroup2.value.non_smoker,
      "transportation": this.registerFormGroup2.value.transportation,
      "exp_cert": this.stringGenerater(this.expcertfinalarray),
      "disablities_care": this.stringGenerater(this.disabilitiesfinalarray),
      "availability": this.stringGenerater(this.availabilityfinalarray),
      "hours_per_week": this.registerFormGroup2.value.hours_per_week,
      "experience": this.registerFormGroup2.value.experience,
      "miles": this.registerFormGroup2.value.miles,
      "willing_to_drive": this.registerFormGroup2.value.willing_to_drive
    }
    this.loaderservice.hideLoader(false);
    this.service.workProfile(obj, this.TOKEN).subscribe((res: any) => {
      this.loaderservice.hideLoader(true);
      this.openSnackBar(res.message, true);
      this.router.navigate(['dashboard', {
        outlets: {
          'dashboard': 'list'
        }
      }])
    },
      (err: any) => {
        this.loaderservice.hideLoader(true);
        this.openSnackBar(err.message, false);
      })
  }

  stringGenerater(array: any) {
    let str = '';
    array.forEach((element: string) => {
      str += element + ','
    });
    return str.substring(0, str.length - 1);
  }

}