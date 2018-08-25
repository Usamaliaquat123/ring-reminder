"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var home_1 = require('../pages/home/home');
var register_1 = require("../pages/register/register");
var events_1 = require("../pages/events/events");
var aboutus_1 = require("../pages/aboutus/aboutus");
var contactus_1 = require("../pages/contactus/contactus");
var logout_1 = require("../pages/logout/logout");
var setting_1 = require("../pages/setting/setting");
var reminder_1 = require("../pages/reminder/reminder");
var forgotpassword_1 = require("../pages/forgotpassword/forgotpassword");
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = home_1.HomePage;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'LOGIN', component: home_1.HomePage },
            //{ title: 'List', component: ListPage },
            //{ title: 'LOGIN', component: LoginPage },
            { title: 'REGISTER', component: register_1.RegisterPage },
            { title: 'LOGOUT', component: logout_1.LogoutPage },
            { title: 'EVENTS', component: events_1.EventsPage },
            { title: 'SETTING', component: setting_1.SettingPage },
            { title: 'ABOUT US', component: aboutus_1.AboutusPage },
            { title: 'CONTACT US', component: contactus_1.ContactusPage },
            { title: 'REMINDER', component: reminder_1.ReminderPage },
            { title: 'FORGOT PASSWORD', component: forgotpassword_1.ForgotPasswordPage }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav)
    ], MyApp.prototype, "nav");
    MyApp = __decorate([
        core_1.Component({
            templateUrl: 'app.html'
        })
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
//# sourceMappingURL=app.component.js.map