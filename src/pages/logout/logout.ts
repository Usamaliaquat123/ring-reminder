import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Http, Response, Headers} from "@angular/http";

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(public navCtrl: NavController, private http:Http) {
    this.http = http;
    localStorage.removeItem('id');
    localStorage.removeItem('login');
    let registration = localStorage.getItem('deviceId');

    var body ='devicename='+ registration;
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

    this.navCtrl.push(HomePage);
  }

}
