import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {ReminderPage} from "../reminder/reminder";
import {Http, Headers, Response} from "@angular/http";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  event: any = [];
  loading : any;
  constructor(public navCtrl: NavController,private http:Http, public loadingController: LoadingController) {
    this.http = http;


    this.events();
    // while (this.event != 'asd' ) {
    //   this.events();
    // }
  }
  myLoading() {
    this.loading = this.loadingController.create({
      content: 'Loading... Please wait.'
    });
    this.loading.present();
  }

  reminderPage(id)
  {
    this.navCtrl.push(ReminderPage);
    localStorage.setItem('eventId',id);
  }

  events(){
    this.myLoading();
    // this.http.get('http://clients3.5stardesigners.net/boxingapp/v1/user/upcommingevent').subscribe(
    //   (res) => console.log(res)
    // );
    var headers = new Headers();

    // headers.append('Cache-Control', 'no-cache'); //HTTP 1.1
    headers.append('Pragma','no-cache');
    this.http.get('http://clients2.5stardesigners.net/boxingapp/v1/tournament/upcommingevent/',{headers: headers}).map(
    // this.http.get('http://localhost/boxingapp/v1/tournament/upcommingevent/').map(
      (res: Response) => res.json()
    ).subscribe((res) => {
      console.log(res.data);
      this.event = res.data;
      console.log(this.event);
      // this.event.id = res.data.id;
      // this.event.name = res.data.name;
      // this.event.start_date = res.data.start_date;
      // this.event.boxername_first = res.data.boxername_first;
      // this.event.boxername_second = res.data.boxername_second;
      // this.event.channel_name = res.data.channel_name;
      this.loading.dismiss();
    }, error => {
      console.log(JSON.stringify(error.json()));
      this.loading.dismiss();
    });

  }

}
