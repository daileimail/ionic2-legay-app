import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login'
import { ChatListPage } from '../chat-list/chat-list'
import { UserInfoPage } from '../user-info/user-info'
import { User } from '../../providers/user'
import { Model } from '../../providers/model'

import { TabPage } from '../tab/tab'
/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private user: User, public alertCtrl: AlertController, public model: Model, public toastCtrl: ToastController,  public appCtrl: App) {

  }

  ionViewDidLoad() {
    //console.log(this.user.getUser())
  }

  loginClick() {
    if (!this.user.getUser()) {
      this.appCtrl.getRootNav().setRoot(LoginPage);
    } else {
      this.user.removeUser()
      this.appCtrl.getRootNav().setRoot(LoginPage);
    }
  }

  goToChats() {
    this.navCtrl.push(ChatListPage)
  }

  editNickname() {
    var that = this;
    let prompt = this.alertCtrl.create({
      title: '修改昵称',
      message: "输入新昵称",
      inputs: [
        {
          name: 'nickname',
          placeholder: '新昵称'
        },
      ],
      buttons: [
        {
          text: '退出',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: '保存',
          handler: data => {
            var nickname = data.nickname;
            var user = that.user.getUser()
            if (data.nickname.length < 4) {
              that.toastCtrl.create({
                message: "昵称太短啦！",
                duration: 3000,
                position: 'top'
              }).present()
            } else {
              that.model.editUser({ objectId: user.objectId, nickname }).then(user => {
                that.user.setUser(user)
              }).catch(err => {
                that.toastCtrl.create({
                  message: err,
                  duration: 3000,
                  position: 'top'
                }).present()
              })
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
