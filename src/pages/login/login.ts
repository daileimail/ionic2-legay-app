import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, App, ViewController } from 'ionic-angular';
import { Model } from '../../providers/model'
import { User } from '../../providers/user'
import { Chat } from '../../providers/chat'
import { TabPage } from '../tab/tab';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  registerCredentials = { phone: '', code: '' };


  constructor(private nav: NavController, private modal: Model, private toastCtrl: ToastController, public appCtrl: App, private user: User, private chat: Chat, public viewCtrl: ViewController) { }

  login() {
    var that = this;
    this.modal.signUpOrlogInWithMobilePhone(this.registerCredentials.phone, this.registerCredentials.code)
      .then((userInfo: any) => {
        this.user.setUser(userInfo);
        this.chat.createClint(userInfo.toJSON());
        this.nav.setRoot(TabPage)
      }).catch(err => {
        this.toastCtrl.create({
          message: err,
          duration: 3000,
          position: 'top'
        }).present();
      })
  }

  getCode() {
    this.modal.requestSmsCode(this.registerCredentials.phone).then(data => {
      this.toastCtrl.create({
        message: "短信发送成功",
        duration: 3000,
        position: 'top'
      }).present();
    }).catch(err => {
      this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
      }).present();
    })
  }
}
