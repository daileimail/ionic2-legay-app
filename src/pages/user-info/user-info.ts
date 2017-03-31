import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { User } from '../../providers/user';
import { Model } from '../../providers/model';
/*
  Generated class for the UserInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoPage {
  userInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private user: User) {
    this.userInfo = user.getUser();
    console.log(this.userInfo)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }

  fileChange(event) {
    let loading = this.loadingCtrl.create({
      content: '图片上传中。。。'
    });
    loading.present();

  }
}
