import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {AuthProvider} from "../../providers/auth/auth";

// components
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {
  user: User = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private firebaseDB: FirebaseDbProvider,
              public auth : AuthProvider,
              public toastCtrl: ToastController) {
    this.user = this.navParams.get('user');
  }

  updateUser() {
    this.firebaseDB.createUser(this.user)
      .then(() => {
        console.log('Usuario actualizado');
        this.presentToast('El usuario ha sido actualizado');
      });
    this.closePage();
  }

  closePage() {
    this.navCtrl.pop();
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  getDate() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime
  }
}
