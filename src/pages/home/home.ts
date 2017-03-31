import { Component } from '@angular/core';

import { App, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { parseString } from 'xml2js'
import { InAppBrowser } from 'ionic-native';
import { ChatcontentPage } from '../chatcontent/chatcontent'

import { Model } from "../../providers/model"
import { Weixin } from '../../providers/weixin';
import { User } from '../../providers/user'
import { Chat } from '../../providers/chat'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
/**
 * type 1 :laoluan 2 gaoxiao
 */
export class HomePage {

  items = [1, 2];
  weixinList = [];
  laoruanList = [];
  legayList = [];
  modalType: string = "legay";
  wxpage = 1
  lrpage = 1;
  lgpage = 1;
  data: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public weixin: Weixin, public appCtrl: App, private model: Model, private user: User, private chat: Chat) {

  }

  doInfinite(infiniteScroll) {
    if (this.modalType == "legay") {
      this.model.getPostByType(2, this.lgpage).subscribe((data: any) => {
        data.map(da => {
          this.legayList.push(da)
        })
        infiniteScroll.complete();
      }, err => {
        console.log(err);
      },
        () => {
          this.lgpage++;
          infiniteScroll.complete();
        })
    }
    else if (this.modalType == "weixin") {
      var that = this;
      this.weixin.getWeilist(this.wxpage).subscribe(
        data => {
          var items = data.items;
          for (let i of items) {
            parseString(i, function (err, result) {
              let wx = result.DOCUMENT.item[0].display[0];
              var image = wx.imglink[0]
              var url = wx.url[0]
              var title = wx.title[0].replace(new RegExp("宝应", 'gm'), "宝应");
              var obj = { image, url, title }
              that.weixinList.push(obj)
            })
          }
        },
        err => {
          console.log(err);
        },
        () => {
          this.wxpage++;
          infiniteScroll.complete();
        }
      );
    } else if (this.modalType == "laoruan") {
      this.model.getPostByType(1, this.lrpage).subscribe((data: any) => {
        data.map(da => {
          this.laoruanList.push(da)
        })
        infiniteScroll.complete();
      }, err => {
        console.log(err);
      },
        () => {
          this.lrpage++;
          infiniteScroll.complete();
        })
    } else {
      infiniteScroll.complete();
    }

  }

  doRefresh(refresher) {
    if (this.modalType == "legay") {
      this.lgpage = 1;
      this.model.getPostByType(2, this.lgpage).subscribe((data: any) => {
        this.legayList = [];
        data.map(lg => {
          this.legayList.push(lg)
        })
      }, err => {
        console.log(err);
      },
        () => {
          this.lgpage++;
          refresher.complete();
        })
    }
    else if (this.modalType == "weixin") {
      this.wxpage = 1;
      var that = this;
      this.weixin.getWeilist(this.wxpage).subscribe(
        data => {
          this.weixinList = []
          var items = data.items;
          for (let i of items) {
            parseString(i, function (err, result) {
              let wx = result.DOCUMENT.item[0].display[0];
              var image = wx.imglink[0]
              var url = wx.url[0]
              var title = wx.title[0].replace(new RegExp("宝应", 'gm'), "宝应");
              var obj = { image, url, title }
              that.weixinList.push(obj)
            })
          }
        },
        err => {
          console.log(err);
        },
        () => {
          this.wxpage++;
          refresher.complete();
        }
      );
    } else if (this.modalType = "laoruan") {
      this.lrpage = 1;
      this.model.getPostByType(1, this.lrpage).subscribe((data: any) => {
        this.laoruanList = [];
        data.map(lr => {
          this.laoruanList.push(lr)
        })
      }, err => {
        console.log(err);
      }, () => {
        this.lrpage++;
        refresher.complete();
      })
    }
  }

  getToBower(url) {
    new InAppBrowser(url, '_system');
    //this.appCtrl.getRootNav().push(HtmlPage,{url});
  }

  getToCahtWithUser(content) {
    if (this.user.getUser() && this.user.getUser().objectId != content.user.objectId) {
      this.appCtrl.getRootNav().push(ChatcontentPage, { toUser: content.user })
    }
  }

}
