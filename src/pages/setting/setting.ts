import { Component } from '@angular/core';
import { NavController , AlertController, LoadingController } from 'ionic-angular';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  user: any = {};
  loading : any;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, private http:Http, public loadingController: LoadingController) {
    this.http = http;
    this.getUser();
  }
  failAlert() {
    let alert = this.alertCtrl.create({
      title: 'Update failed',
      subTitle: 'User profile update failed or password do not matched',
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
  getUser(){
    // var body = 'id='+17;
    // var headers = new Headers();
    // let params = new URLSearchParams();
    // params.set('id','17');
    this.myLoading();
    let id = localStorage.getItem('id');
    this.http.get('http://clients2.5stardesigners.net/boxingapp/v1/user/getuser/'+id).map(
          (res: Response) => res.json()
        ).subscribe((res) => {

      console.log(res.data);
      this.user = res.data;

        this.loading.dismiss();

      },
      (error) => console.log(error.json())

    );


    // headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  //   this.http.get('http://clients3.5stardesigners.net//boxingapp/v1/user/getuser/passinguserid',body,{headers:headers}).map(
  //     (res: Response) => res.json()
  //   ).subscribe((res) => {
  //     console.log(res);
  //     // this.event.id = res.data.id;
  //     // this.event.name = res.data.name;
  //     // this.event.start_date = res.data.start_date;
  //     // this.event.boxername_first = res.data.boxername_first;
  //     // this.event.boxername_second = res.data.boxername_second;
  //     // this.event.channel_name = res.data.channel_name;
  //
  //   }, error => {
  //     console.log(JSON.stringify(error.json()));
  //   });
  //
  }
  updateAlert() {
    let alert = this.alertCtrl.create({
      title: 'Update success',
      subTitle: 'User profile updated successfully',
      buttons: ['OK']
    });
    alert.present();
  }
  updateUser(){
    this.myLoading();
    if(this.user.oldPassword != undefined){
    var body ='id='+this.user.id+'&fname='+this.user.first_name+'&lname='+this.user.last_name+'&phone='+this.user.phone+'&password='+this.user.oldPassword+'&new_password='+this.user.password;
    }
    else{
      var body ='id='+this.user.id+'&fname='+this.user.first_name+'&lname='+this.user.last_name+'&phone='+this.user.phone;
    }
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http
      .post('http://clients2.5stardesigners.net/boxingapp/v1/user/updateuserdata',
        body, {
          headers: headers
        }).map(
      (res: Response) => res.json()
    ).subscribe((res) => {
      console.log(res);
      if(res.data.update == "true"){
        this.updateAlert();
      }
      else{
        this.failAlert();
      }
      this.loading.dismiss();
    }, error => {
      console.log(JSON.stringify(error.json()));
      this.loading.dismiss();
    });


  }

}
