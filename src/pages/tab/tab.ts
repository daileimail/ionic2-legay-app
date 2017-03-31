import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home'
import { SettingPage } from '../setting/setting'
import { AddPostPage } from '../add-post/add-post'
import { User } from '../../providers/user'
import { LoginPage } from "../login/login"
/*
  Generated class for the Tab tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html'
})
export class TabPage {

  tab1Root: any = HomePage;
  tab3Root: any = SettingPage;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private user: User) {

  }

  addPost() {
    if (!this.user.getUser()) {
      this.navCtrl.push(LoginPage);
    } else {
      this.modalCtrl.create(AddPostPage).present();
    }
  }

}