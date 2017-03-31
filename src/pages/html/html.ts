import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
/*
  Generated class for the Html page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-html',
  templateUrl: 'html.html'
})
export class HtmlPage {

  url :SafeResourceUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams,public sanitizer: DomSanitizer) {

    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.navParams.get('url'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HtmlPage');
  }

}
