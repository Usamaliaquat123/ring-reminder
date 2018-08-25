import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController} from 'ionic-angular';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html'
})
export class ReminderPage {
  matchList: any = [];
  subscriptionList: any = [];
  date : any;
  channel : any;
  glovesId : any;
  loading : any;

  constructor(public navCtrl: NavController,private http:Http,private alertCtrl: AlertController,public loadingController: LoadingController) {
    this.http = http;
    this.getMatchList();
  }
  alarmAlert() {
    let alert = this.alertCtrl.create({
      title: 'Reminder set',
      subTitle: 'Your reminder added successfully',
      buttons: ['OK']
    });
    alert.present();
  }
  myLoading() {
    this.loading = this.loadingController.create({
      content: 'Loading... Please wait.'
    });
    this.loading.present();
  }

  getMatchList(){
    this.myLoading();

    let eventId = localStorage.getItem('eventId');
    let userId = localStorage.getItem('id');

    var body ='tournament_id=' + eventId;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http
      .post('http://clients2.5stardesigners.net/boxingapp/v1/tournament/tournamentmatchlist',
        body, {
          headers: headers
        }).map(
      (res: Response) => res.json()
    ).subscribe((res) => {
      console.log(res);
      this.matchList = res.data;



      // var body = 'userId=' + userId + '&tournamentId=' + eventId;
      var body = 'userId=' + userId + '&tournamentId=' + eventId;
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      this.http
        .post('http://clients2.5stardesigners.net/boxingapp/v1/reminder/checkuserreminder',
        // .post('http://localhost/boxingapp/v1/reminder/checkuserreminder',
          body, {
            headers: headers
          }).map(
        (res: Response) => res.json()
      ).subscribe((res) => {
        console.log('check user subscription',res);
         this.subscriptionList = res.data;
        let evenFlag = true;
        for (let list of this.matchList) {

          if(evenFlag == true){
            list.even = true;
            evenFlag = false;
          }else{
            list.even = false;
            evenFlag = true;
          }

           // if(this.subscriptionList.length == 0){
           //   // alert(this.subscriptionList);
           //   list.subscription = false;
           // }
          for (let subcList of this.subscriptionList) {
            if(subcList.matchId == list.MatchId && subcList.user_id == userId){
              list.subscription = true;
              break;
            }else{
              list.subscription = false;
            }
          }

        }





      }, error => {
        console.log(JSON.stringify(error.json()));
        this.loading.dismiss();
      });



      this.date = this.matchList[0].start_date;
      this.channel = this.matchList[0].channelname;

      for (let list of this.matchList) {
        if(!list.WinnerName && list.status == 0){
          this.glovesId = list.MatchId;
          // alert(this.glovesId);
          break;
        }
      }
      console.log(this.matchList);
      this.loading.dismiss();
    }, error => {
      console.log(JSON.stringify(error.json()));
      this.loading.dismiss();
    });

  }


  setAlarm(date,matchId,index){
    // alert(index);
    let userId = localStorage.getItem('id');
    var body ='matchdate=' + date +'&matchid='+ matchId +'&status='+ 0 +'&userid='+ userId;
    // var body ='&userid='+ userId;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http
      .post('http://clients2.5stardesigners.net/boxingapp/v1/reminder/remindersubscriber',
      // .post('http://localhost/boxingapp/v1/reminder/remindersubscriber',
        body, {
          headers: headers
        }).map(
      (res: Response) => res.json()
    ).subscribe((res) => {
      console.log(res);
      console.log('asdasdasd',this.matchList[index].subscription);
      this.matchList[index].subscription = true;
      this.alarmAlert();

    }, error => {
      console.log(JSON.stringify(error.json()));
    });

  }

}
