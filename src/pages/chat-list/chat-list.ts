import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'
import { App, ViewController } from 'ionic-angular';
import { ChatcontentPage } from '../chatcontent/chatcontent'

import { Chat } from '../../providers/chat'

/*
  Generated class for the ChatList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html'
})
export class ChatListPage {
  chatList;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public appCtrl: App, public chat:Chat) {
    this.chatList = chat.chatList;
  }

  ionViewDidLoad() {

  }

  gotoChatContent(toUser) {
    this.appCtrl.getRootNav().push(ChatcontentPage,{toUser});
  }

}
