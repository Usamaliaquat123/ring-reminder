import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import { HomePage } from '../home/home';

@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html'
})
export class ForgotPasswordPage {
  user: any = {};
  constructor(public navCtrl: NavController,private http:Http,private alertCtrl: AlertController) {
    this.http = http;
  }
  forgetAlert() {
    let alert = this.alertCtrl.create({
      title: 'Password sent Success',
      subTitle: 'Email sent successfully. Please check your email',
      buttons: ['OK']
    });
    alert.present();
  }
  forgetAlertFail() {
    let alert = this.alertCtrl.create({
      title: 'Password sent failed',
      subTitle: 'Email does not exist',
      buttons: ['OK']
    });
    alert.present();
  }
  forgetPassword(){
    var body ='email='+this.user.email.toLowerCase();
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http
      .post('http://clients2.5stardesigners.net/boxingapp/v1/user/userforget',
        body, {
          headers: headers
        }).map(
      (res: Response) => res.json()
    ).subscribe((res) => {
      console.log(res);
      if(res.data.isEmail == 'true'){
        this.forgetAlert();
        this.navCtrl.push(HomePage);
      }
      if(res.data.isEmail == 'false'){
        this.forgetAlertFail();
      }
    }, error => {
      // console.log(JSON.stringify(error.json()));
      console.log(JSON.stringify(error));
    });

  }
}
