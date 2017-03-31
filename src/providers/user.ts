import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  user: Object

  constructor(public http: Http, private storage: Storage) {
    storage.get("user").then(data => {
      this.user = data;
    })
  }

  setUser(me) {
    this.user = me.toJSON()
    this.storage.set("user",this.user)
  }

  getUser() :any{
    return this.user;
  }

  removeUser() {
    this.storage.remove("user").then(data => {
      this.user = null;
    })
  }
  


}
