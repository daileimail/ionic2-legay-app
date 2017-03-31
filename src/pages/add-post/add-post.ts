import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import * as $ from 'jquery'
import { User } from '../../providers/user'
import { Model } from '../../providers/model'
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the AddPost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html'
})
export class AddPostPage {

  post = { url: "", type: "1", content: "" }
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public model: Model, private user: User, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  upClick() {
    var input = document.getElementById("upload")
    $(input).trigger('click');

  }

  fileChange(event) {
    let loading = this.loadingCtrl.create({
      content: '图片上传中。。。'
    });
    loading.present();
    this.model.fileUpload(event.srcElement.files[0]).then(res => {
      this.post.url = res["url"]()
      loading.dismiss();
    }).catch(err => {
      console.log(err)
    })
  }

  submit() {

    this.model.addPost(this.user.getUser(), this.post).then(data => {
      this.toastCtrl.create({
        message: '发布成功',
        duration: 3000,
        position: 'top'
      }).present();
      this.viewCtrl.dismiss();
    }).catch(err => {
      console.log("err-->", err)
    })
  }

}
