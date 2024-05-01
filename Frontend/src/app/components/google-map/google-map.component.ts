import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// import {} from '@types/googlemaps';
// import { google } from '@google/maps';
declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  lat = 0;
  lng = 0;
  zipcode = '';
  address_name = '';

  @ViewChild('search') 
  public elementRef : ElementRef;
  searchControl : FormControl;

  
  constructor(private dialogRef : MatDialogRef<GoogleMapComponent>,private mapsApiLoader : MapsAPILoader,private ngZone : NgZone) { }

  ngOnInit(): void {
    this.mapsApiLoader.load().then(()=>{
      let autocomplete = new google.maps.places.Autocomplete(this.elementRef.nativeElement,{
        types : []
      })
      autocomplete.addListener('place_changed',()=>{
        this.ngZone.run(()=>{
          const place : any = autocomplete.getPlace();
          if(place.geometry != undefined && place.geometry != null){
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            var latlng = new google.maps.LatLng(this.lat, this.lng);
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'location': latlng }, (results:any, status:any) => {
              if (status == google.maps.GeocoderStatus.OK) {
                  let result = results[0];
                  let rsltAdrComponent = result.address_components;
                  if (result != null) {
                      let zipcode = rsltAdrComponent.find((x:any) => x.types == 'postal_code').long_name;
                      let address = rsltAdrComponent[0].long_name;
                      address += ", "+rsltAdrComponent[1].long_name;
                      address += ", "+rsltAdrComponent[2].long_name;
                      let city = rsltAdrComponent[1].long_name;
                      this.closeDialog({address : {
                        address_name : address,
                        zipcode,
                        city,
                        lat : this.lat,
                        lng : this.lng
                      }});
                  } else {
                      alert("No address available!");
                  }
              }
          });
          }
        })
      })
    })
  }

  closeDialog(obj:any){
    this.dialogRef.close(obj);
  }

}
