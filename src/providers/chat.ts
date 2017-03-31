import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Realtime, TextMessage, IMClient } from 'leancloud-realtime';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Model } from './model'
/*
  Generated class for the Chat provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Chat {

  realtime;
  my: IMClient;
  myObject;
  chatList = [];

  constructor(public http: Http, public storage: Storage, public events: Events, public model: Model) {
    this.realtime = new Realtime({
      appId: 'OiDwBOUIRq1BpbwWOmkRO71L-gzGzoHsz',
      region: 'cn', //美国节点为 "us"
    });
    storage.get("user").then(data => {
      if (data) {
        this.createClint(data)
      }
    })
  }

  createClint(user) {
    this.myObject = user;
    var that = this;
    this.realtime.createIMClient(user.objectId).then(function (my) {
      that.my = my;
      that.getOrUpdateChatList()
      my.on('message', function (message, conversation) {
        var cId = conversation.id;
        that.events.publish(cId, message);
        that.events.publish("conversation", conversation)
        that.getOrUpdateChatList()
      });
    }).catch(err => {
      console.log(err)
    });
  }

  createConversation(toUser) {
    var that = this;
    this.my.createConversation({
      members: [that.myObject.objectId, toUser.objectId],
      name: toUser.nickname + "&" + that.myObject.nickname,
      transient: false,
      unique: true,
    }).then(conversation => {
      this.events.publish("conversation", conversation)
    }).catch(console.error)
  }

  getOrUpdateChatList() {
    var that = this;
    that.chatList=[];
    this.my.getQuery().containsMembers([this.myObject.objectId]).find().then(function (conversations) {
      conversations.map(function (conversation) {
        var objectId = conversation.members.filter(objectId => {
          return objectId != that.myObject.objectId
        })[0];
        console.log(objectId)
        that.model.getUserById(objectId).then((user: any) => {
          that.chatList.push(user.toJSON())
        })
      });

    }).catch(console.error.bind(console));
  }
}
