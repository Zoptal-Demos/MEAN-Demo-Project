import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // BASE_URL : string = environment.production ? "http://locahost:5000/v1/User/" : "http://locahost:5000/v1/User/";
  BASE_URL : string = "http://locahost:5000/v1/User/";
  IMAGE_URL : string = "http://locahost:5000/image/";

  constructor(private http : HttpClient,private router : Router) { }

  login(body:any){
    return this.http.post(`${this.BASE_URL}login`,body);
  }

  forgotPassword(body:any){
    return this.http.post(`${this.BASE_URL}forgotPassword`,body);
  }

  register(body:any){
    return this.http.post(`${this.BASE_URL}signUpFreeTrail`,body);
  }

  addCaregiver(body:any){
    return this.http.post(`http://locahost:5000/v1/Admin/add_user`,body);
  }
  uploadPic(body:any,token:string){
    return this.http.post(`${this.BASE_URL}upload_pic`,body,{
      headers : this.headerFill(token)
    });
  }

  updateProfile(body:any,token:string){
    return this.http.post(`${this.BASE_URL}update_profile`,body,{
      headers : this.headerFill(token)
    });
  }

  workProfile(body:any,token:string){
    return this.http.post(`${this.BASE_URL}work_profile`,body,{
      headers : this.headerFill(token)
    });
  }

  changePassword(body:any,token:string){
    return this.http.put(`${this.BASE_URL}change_password`,body,{
      headers : this.headerFill(token)
    });
  }

  headerFill(token:string) : any {
    let headers = new HttpHeaders();
    headers = headers.set('x-logintoken', token);
    return headers;
  }

  getCategories(id:string,token:string,type:string) : any {
    return this.http.get(`${this.BASE_URL}categories?type=${type}&&skip=0&&limit=100&&user_id=${id}`,{
      headers : this.headerFill(token)
    })
  }

  getInfo(id:string,token:string) : any {
    return this.http.get(`${this.BASE_URL}getChatUserInfo?userId=${id}`,{
      headers : this.headerFill(token)
    })
  }


  getRatings(id:string,token:string) : any {
    return this.http.get(`${this.BASE_URL}get_ratings?user_id=${id}&&skip=0&&limit=1000`,{
      headers : this.headerFill(token)
    })
  }

  getCarefiverDetails(id:string,token:string) : any {
    return this.http.get(`${this.BASE_URL}view_profile?user_id=${id}`,{
      headers : this.headerFill(token)
    })
  }

  getNotifications(token:string){
    return this.http.get(`${this.BASE_URL}get_notification?skip=0&&limit=1000`,{
      headers : this.headerFill(token)
    });
  }

  getCaregivers(token:string) : any {
    return this.http.get(`${this.BASE_URL}find_employer_new?longitude=30.7046&latitude=76.7179&zipcode=160055`,{
      headers : this.headerFill(token)
    })
  }

  searchJobs(data:any,token:string){
    return this.http.get(`http://locahost:5000/v1/Jobs/searchJobs?latitude=${data.latitude}&longitude=${data.longitude}&zipcode=${data.zipcode}`,{
      headers : this.headerFill(token)
    });
  }

  jobDetails(id:string,token:string){
    return this.http.get(`http://locahost:5000/v1/Jobs/jobDetails?jobId=${id}`,{
      headers : this.headerFill(token)
    });
  }

  findAddress(input:any){
    return this.http.get(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places&callback=initMap`);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  rateNow(data:any,token:string){
    return this.http.post(`${this.BASE_URL}rate_and_review`,data,{
      headers : this.headerFill(token)
    });
  }

}