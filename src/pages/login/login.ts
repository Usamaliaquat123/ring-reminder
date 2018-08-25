import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: any = {};
  constructor(public navCtrl: NavController,
  private http:Http
) {

  }

  login(){
    var body = '&email='+this.user.email+'&password='+this.user.password;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http
      .post('http://clients2.5stardesigners.net/boxingapp/v1/user/userlogin',
        body, {
          headers: headers
        })
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(JSON.stringify(error.json()));
      });


    // this.http.post(
    //   'http://clients3.5stardesigners.net/boxingapp/v1/user/usersignup',
    //   // JSON.stringify({fname:'Joe',lname:'Smith',email:'abc@gmail.com',password:'7815696ecbf1c96e6894b779456d330e',phone:'234234234'}),
    //   body,{headers:headers}
    // ).map(
    //   (res: Response) => res.json()
    // ).subscribe(
    //   (res) => {
    //     console.log("VALUE RECEIVED: ",res);
    //   },
    //   (x) => {
    //     // /!* this function is executed when there's an ERROR *!/
    //     console.log("ERROR: "+x);
    //   },
    //   () => {
    //     // /!* this function is executed when the observable ends (completes) its stream *!/
    //     console.log("Completed");
    //   }
    // );

  }

}
