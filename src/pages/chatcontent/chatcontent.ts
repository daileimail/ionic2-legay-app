import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user'
import { Events } from 'ionic-angular';

import { TextMessage } from 'leancloud-realtime';

import { Chat } from '../../providers/chat'
import { Model } from '../../providers/model'
/*
  Generated class for the Chatcontent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chatcontent',
  templateUrl: 'chatcontent.html'
})
export class ChatcontentPage {

  chatContent = [];
  conversation: any;
  message = { text: "" };
  me;
  to;
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User, public events: Events, private chat: Chat, private model: Model) {
    var that = this;
    let toUser = navParams.data.toUser;
    that.me = user.getUser()
    that.to = toUser;
    chat.createConversation(toUser)

    this.events.subscribe('conversation', conversation => {
      if (!that.conversation) {
        that.conversation = conversation;
        conversation.queryMessages({
          limit: 10,
        }).then(function (messages) {
          messages.map(ms => {
            if (ms.from == that.me.objectId) {
              that.chatContent.push({ message: ms.text, isMe: true, imgUrl: that.me.imgUrl })
            } else {
              that.chatContent.push({ message: ms.text, isMe: false, imgUrl: that.to.imgUrl })
            }
          })
        }).catch(console.error.bind(console));

        that.events.subscribe(conversation.id, message => {
          that.chatContent.push({ message: message.text, isMe: false, imgUrl: that.to.imgUrl })
        })
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatcontentPage');
  }

  send() {
    if (this.message.text) {
      this.chatContent.push({ message: this.message.text, isMe: true, imgUrl: this.me.imgUrl })
      this.conversation.send(new TextMessage(this.message.text));
      this.message.text = ""
    }
  }

}
