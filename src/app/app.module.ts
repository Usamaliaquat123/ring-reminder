import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Push } from '@ionic-native/push';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { EventsPage } from '../pages/events/events';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactusPage } from '../pages/contactus/contactus';
import { LogoutPage } from '../pages/logout/logout';
import { SettingPage } from '../pages/setting/setting';
import { LoginPage } from '../pages/login/login';
import { ReminderPage } from '../pages/reminder/reminder';
import { ForgotPasswordPage } from '../pages/forgotpassword/forgotpassword';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    EventsPage,
    AboutusPage,
    ContactusPage,
    LogoutPage,
    SettingPage,
    LoginPage,
    ReminderPage,

    ForgotPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    EventsPage,
    AboutusPage,
    ContactusPage,
    LogoutPage,
    SettingPage,
    LoginPage,
    ReminderPage,
    ForgotPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

}
