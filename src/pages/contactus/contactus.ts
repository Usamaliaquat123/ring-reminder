import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {EventsPage} from "../events/events";

@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html'
})
export class ContactusPage {
  user: any = {};
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,
              private http:Http) {
    this.http = http;
  }
  contactAlert() {
    let alert = this.alertCtrl.create({
      title: 'Message Send',
      subTitle: 'Your message send successfully, We will contact you soon',
      buttons: ['OK']
    });
    alert.present();
  }

  contact(){

    var body = 'name='+this.user.name+'&phone_number='+this.user.number+'&email_address='+this.user.email.toLowerCase()+'&message='+this.user.message;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    this.http.post(
      'http://clients2.5stardesigners.net/boxingapp/v1/user/contactus',
      // JSON.stringify({fname:'Joe',lname:'Smith',email:'abc@gmail.com',password:'7815696ecbf1c96e6894b779456d330e',phone:'234234234'}),
      body,{headers:headers}
    ).map(
      (res: Response) => res.json()
    ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ",res);

        this.contactAlert();
        this.navCtrl.push(EventsPage);
      },
      (x) => {
        // /!* this function is executed when there's an ERROR *!/
        console.log("ERROR: "+x);
      },
      () => {
        // /!* this function is executed when the observable ends (completes) its stream *!/
        console.log("Completed");
      }
    );
  }


}
