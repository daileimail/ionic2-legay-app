import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//pages
import { HomePage } from '../pages/home/home';
import { ChatListPage } from '../pages/chat-list/chat-list'
import { SettingPage } from '../pages/setting/setting'
import { TabPage } from '../pages/tab/tab'
import { ChatcontentPage } from '../pages/chatcontent/chatcontent'
import { HtmlPage } from '../pages/html/html'
import { LoginPage } from '../pages/login/login'
import { Storage } from '@ionic/storage'
import { AddPostPage } from '../pages/add-post/add-post'
import { UserInfoPage } from '../pages/user-info/user-info'

//privider
import { Weixin } from '../providers/weixin'
import { Model } from '../providers/model'
import { User } from '../providers/user'
import { Chat } from '../providers/chat'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatListPage,
    TabPage,
    SettingPage,
    ChatcontentPage,
    HtmlPage,
    LoginPage,
    AddPostPage,
    UserInfoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatListPage,
    TabPage,
    SettingPage,
    ChatcontentPage,
    HtmlPage,
    LoginPage,
    AddPostPage,
    UserInfoPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage, Model, Weixin, User, Chat]
})
export class AppModule { }
