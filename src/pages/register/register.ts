import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
// import {Http} from "@angular/http";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import { FormsModule } from '@angular/forms';
import { NG_VALIDATORS,Validator,
  Validators,AbstractControl,ValidatorFn } from '@angular/forms';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  user: any = {};
  submitted:boolean = false;
  loading : any;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,
              private http:Http,public loadingController: LoadingController
) {
    this.http = http;
    console.log(this.user);
    this.submitted= false;
  }
  myLoading() {
    this.loading = this.loadingController.create({
      content: 'Loading... Please wait.'
    });
    this.loading.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Registration Success',
      subTitle: 'User register succefully',
      buttons: ['OK']
    });
    alert.present();
  }
  emailExistAlert() {
    let alert = this.alertCtrl.create({
      title: 'Registration Failed',
      subTitle: 'Email already exist',
      buttons: ['OK']
    });
    alert.present();
  }
// register(){
//   console.log(this.user);
//    this.http.post('clients2.5stardesigners.net/boxingapp/v1/user/usersignup',this.user )
//     .map((response: Response) => {
//       // login successful if there's a jwt token in the response
//       // let user = response.json();
//       // if (user && user.token) {
//       //   // store user details and jwt token in local storage to keep user logged in between page refreshes
//       //   localStorage.setItem('currentUser', JSON.stringify(user));
//       // }
//       console.log(response);
//     });
//
// }
//   register1 (): Observable<string[]> {
//   alert('sd');
//     let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
//     let options       = new RequestOptions({ headers: headers })
//     return this.http.post('clients2.5stardesigners.net/boxingapp/v1/user/usersignup', this.user, options) // ...using post request
//       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
//       .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
//   }
//   get(): Observable<string[]> {
//   alert('get');
//     return this.http.post('clients2.5stardesigners.net/boxingapp/v1/user/usersignup', this.user)
//       .map((res: Response) => res.json())
//       //              .do(data => console.log('server data:', data))  // debug
//
//   }
  register(){
    this.submitted= true;
    let deviceId = localStorage.getItem('deviceId');
    this.myLoading();
    var body = 'fname='+this.user.fname+'&lname='+this.user.lname+'&phone='+this.user.number+'&email='+this.user.email.toLowerCase()+'&password='+this.user.password+ '&devicename=' + deviceId +'&status=0';
    var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');


    this.http.post(
      'http://clients2.5stardesigners.net/boxingapp/v1/user/usersignup',
      // JSON.stringify({fname:'Joe',lname:'Smith',email:'abc@gmail.com',password:'7815696ecbf1c96e6894b779456d330e',phone:'234234234'}),
      body,{headers:headers}
    ).map(
      (res: Response) => res.json()
    ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ",res);
        console.log('response', res);
        if(res.data.signup == 'true'){
        this.presentAlert();
        this.navCtrl.push(HomePage);
        }
        if(res.data.signup == 'false'){
          this.emailExistAlert();
        }
        this.loading.dismiss();
      },
      (x) => {
        // /!* this function is executed when there's an ERROR *!/
        console.log("ERROR: "+x);
        alert('Registration failed');
        this.loading.dismiss();
      },
      () => {
        // /!* this function is executed when the observable ends (completes) its stream *!/
        console.log("Completed");
      }
    );



  }
}
