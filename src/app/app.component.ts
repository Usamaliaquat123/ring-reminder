import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
// import { NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
// import {RegisterPage} from "../pages/register/register";
import {EventsPage} from "../pages/events/events";
import {AboutusPage} from "../pages/aboutus/aboutus";
import {ContactusPage} from "../pages/contactus/contactus";
import {LogoutPage} from "../pages/logout/logout";
import {SettingPage} from "../pages/setting/setting";
// import {LoginPage} from "../pages/login/login";
// import {ReminderPage} from "../pages/reminder/reminder";
// import {ForgotPasswordPage} from "../pages/forgotpassword/forgotpassword";
import {Observable} from "rxjs";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
   login:any = localStorage.getItem('login');
   rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public push: Push , private http:Http, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController) {
    this.initializeApp();
    this.login = localStorage.getItem('login');
    this.http = http;
    Observable.interval(1000)
      .subscribe(() => {
        this.login = localStorage.getItem('login');
      });
    // $scope.$watch(function () { return localStorage.getItem('id'); },function(newVal,oldVal){
    //   if(oldVal!==newVal && newVal === undefined){
    //     console.log('It is undefined');
    //   }
    // })

    if (this.login) this.rootPage = EventsPage;
    // this.loginCondition();
    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'LOGIN', component: HomePage },
    //   //{ title: 'List', component: ListPage },
    //   //{ title: 'LOGIN', component: LoginPage },
    //   { title: 'REGISTER', component: RegisterPage },
    //   { title: 'LOGOUT', component: LogoutPage },
    //   { title: 'EVENTS', component: EventsPage },
    //   { title: 'SETTING', component: SettingPage },
    //   { title: 'ABOUT US', component: AboutusPage },
    //   { title: 'CONTACT US', component: ContactusPage },
    //   { title: 'REMINDER', component: ReminderPage },
    //   { title: 'FORGOT PASSWORD', component: ForgotPasswordPage }
    //
    //
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushsetup();

    });

  }

  pushsetup() {
    const options: PushOptions = {
      android: {
        senderID: '229874956764',
        sound: 'default',
        // sound: '0477.wav',
        vibrate: 'true'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: 'New Push notification',
          message: notification.message
        });
        youralert.present();
      }

    });

    pushObject.on('registration').subscribe((registration: any) => {
      //do whatever you want with the registration ID
      console.log("device token" + registration.registrationId);

      localStorage.setItem('deviceId', registration.registrationId);

      var body ='devicename='+ registration.registrationId;
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

      this.http
        .post('http://clients2.5stardesigners.net/boxingapp/v1/user/deviceid',
          body, {
            headers: headers
          }).map(
        (res: Response) => res.json()
      ).subscribe((res) => {
        console.log(res);
        localStorage.setItem('id',res.data.userId);
      }, error => {
        console.log(JSON.stringify(error.json()));
      });


    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));

}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page == 'AboutusPage')  this.nav.setRoot(AboutusPage) ;
    if (page == 'HomePage')  this.nav.setRoot(HomePage) ;
    if (page == 'EventsPage')  this.nav.setRoot(EventsPage) ;
    if (page == 'ContactusPage')  this.nav.setRoot(ContactusPage) ;

    if (page == 'LogoutPage')  {this.nav.setRoot(HomePage);
    localStorage.removeItem('login');
      this.login = '';
    };
    if (page == 'SettingPage')  this.nav.setRoot(SettingPage) ;
    // if (page == 'EventsPage')  this.nav.setRoot(EventsPage) ;
    // this.nav.setRoot(page);
  }
}
