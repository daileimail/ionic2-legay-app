import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabPage } from '../pages/tab/tab';
import { LoginPage } from '../pages/login/login'

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  constructor(platform: Platform, private storage: Storage) {

    storage.get("user").then(data => {
      if (data) {
        this.rootPage = TabPage
      } else {
        this.rootPage = LoginPage
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
