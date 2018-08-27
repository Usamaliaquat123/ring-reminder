import {Component, ViewChild} from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {ForgotPasswordPage} from "../forgotpassword/forgotpassword";
import {EventsPage} from "../events/events";
import {RegisterPage} from "../register/register";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
// import {Nav, Platform} from 'ionic-angular';
// import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // @ViewChild(Nav) nav: Nav;
  user: any = {};
  // rootPage: any = HomePage;
  constructor(public navCtrl: NavController,private http:Http,private alertCtrl: AlertController
  ) {
    this.http = http;

  }
  loginAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login Failure',
      subTitle: 'Username or password does not exist',
      buttons: ['OK']
    });
    alert.present();
  }

   forgotPage()
    {
      this.navCtrl.push(ForgotPasswordPage);
    }
  eventPage()
  {
    this.navCtrl.push(EventsPage);
  }
  registerPage()
  {
      // this.navCtrl.setRoot(RegisterPage);
      // this.navCtrl.getRootNav().push(RegisterPage);
      this.navCtrl.push(RegisterPage);
    // this.navCtrl.push(RegisterPage);
  }

  login(){
    var body ='email='+this.user.email.toLowerCase()+'&password='+this.user.password;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http
      .post('http://clients2.5stardesigners.net/boxingapp/v1/user/userlogin',
        body, {
          headers: headers
        }).map(
      (res: Response) => res.json()
    ).subscribe((res) => {
        console.log(res);
        if(res.data.login == 'true'){
        this.navCtrl.push(EventsPage);
        //   this.nav.setRoot(EventsPage);
        //   this.rootPage = EventsPage;
          localStorage.setItem('id', res.data.userid);
          localStorage.setItem('login', res.data.login);
        }
      if(res.data.login == 'false'){
        this.loginAlert();
      }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });

  }
}
