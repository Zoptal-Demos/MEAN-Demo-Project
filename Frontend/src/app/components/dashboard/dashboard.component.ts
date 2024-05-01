import { Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection : ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {

  hideloader : boolean = true;

  constructor(private loaderservice : LoaderService,private changeDetector : ChangeDetectorRef) {
    this.loaderservice.changeEmitted$.subscribe(data => {
      this.hideloader = data;
      this.changeDetector.detectChanges();
      })
   }

  ngOnInit(): void {
  }

  changeNow($event:any){
    console.log($event)
    // this.hideloader = $event.hideLoader;
  }

}
