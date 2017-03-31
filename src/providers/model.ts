import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import AV from "leancloud-storage"
/*
  Generated class for the Model provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Model {

  URL: string = "http://legay.leanapp.cn"

  constructor(public http: Http) {
    console.log('Hello Model Provider');
    var APP_ID = 'OiDwBOUIRq1BpbwWOmkRO71L-gzGzoHsz';
    var APP_KEY = 'ift4IYpwtX3gtsnmEYnGMHO2';
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });
  }


  requestSmsCode(phoneNum) {
    return AV.Cloud.requestSmsCode(phoneNum)

  }

  signUpOrlogInWithMobilePhone(phone, code) {
    return AV.User.signUpOrlogInWithMobilePhone(phone, code)
  }

  fileUpload(localFile) {
    var key = new Date().getTime().toString()
    var file = new AV.File(key, localFile);
    return file.save()
  }

  addPost(user, post) {
    var Content = new AV.Object('content');
    var query = new AV.Query('_User')
    return query.get(user.objectId).then(data => {
      Content.set("user", data);
      Content.set("type", parseInt(post.type));
      Content.set("url", post.url);
      Content.set("content", post.content);
      Content.set("state", 0);
      return Content.save()
    })
  }

  getPostByType(type, pagenum) {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    return this.http.get(this.URL + '/content/' + type + "?pagenum=" + pagenum)
      .map(resp => resp.json())
  }

  getUserById(objectId) {
    var query = new AV.Query('_User')
    return query.get(objectId)
  }

  editUser(user) {
    var query = new AV.Query('_User')
    console.log(user)
    return query.get(user.objectId).then((userObj: any) => {
      for (let prop in user) {
        console.log(prop)
        if (prop != 'objectId') {
          userObj.set(prop, user[prop])
        }
      }
      return userObj.save()
    })
  }

}

export {
  AV
}