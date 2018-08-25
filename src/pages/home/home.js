"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forgotpassword_1 = require("../forgotpassword/forgotpassword");
var events_1 = require("../events/events");
var register_1 = require("../register/register");
var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.forgotPage = function () {
        this.navCtrl.push(forgotpassword_1.ForgotPasswordPage);
    };
    HomePage.prototype.eventPage = function () {
        this.navCtrl.push(events_1.EventsPage);
    };
    HomePage.prototype.registerPage = function () {
        // this.navCtrl.setRoot(RegisterPage);
        // this.navCtrl.getRootNav().push(RegisterPage);
        this.navCtrl.push(register_1.RegisterPage);
        // this.navCtrl.push(RegisterPage);
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
//# sourceMappingURL=home.js.map