"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var app_component_1 = require('./app.component');
var home_1 = require('../pages/home/home');
var list_1 = require('../pages/list/list');
var register_1 = require('../pages/register/register');
var events_1 = require('../pages/events/events');
var aboutus_1 = require('../pages/aboutus/aboutus');
var contactus_1 = require('../pages/contactus/contactus');
var logout_1 = require('../pages/logout/logout');
var setting_1 = require('../pages/setting/setting');
var login_1 = require('../pages/login/login');
var reminder_1 = require('../pages/reminder/reminder');
var forgotpassword_1 = require('../pages/forgotpassword/forgotpassword');
var status_bar_1 = require('@ionic-native/status-bar');
var splash_screen_1 = require('@ionic-native/splash-screen');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.MyApp,
                home_1.HomePage,
                list_1.ListPage,
                register_1.RegisterPage,
                events_1.EventsPage,
                aboutus_1.AboutusPage,
                contactus_1.ContactusPage,
                logout_1.LogoutPage,
                setting_1.SettingPage,
                login_1.LoginPage,
                reminder_1.ReminderPage,
                forgotpassword_1.ForgotPasswordPage
            ],
            imports: [
                platform_browser_1.BrowserModule,
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp),
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.MyApp,
                home_1.HomePage,
                list_1.ListPage,
                register_1.RegisterPage,
                events_1.EventsPage,
                aboutus_1.AboutusPage,
                contactus_1.ContactusPage,
                logout_1.LogoutPage,
                setting_1.SettingPage,
                login_1.LoginPage,
                reminder_1.ReminderPage,
                forgotpassword_1.ForgotPasswordPage
            ],
            providers: [
                status_bar_1.StatusBar,
                splash_screen_1.SplashScreen,
                { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map