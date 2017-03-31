import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Weixin provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Weixin {

  constructor(public http: Http) {
    
  }

  getWeilist(page) {
    var resp = this.http.get('http://weixin.sogou.com/weixinwap?page='+page+'&_rtype=json&query=%E5%AE%9D%E5%BA%94&type=2&ie=utf8&_sug_=n&_sug_type_=-1&s_from=input')
    .map(resp => resp.json())
    return resp
  }

}
