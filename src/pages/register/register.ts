import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {AuthProvider} from "../../providers/auth/auth";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user: User = {
    name: '',
    lastname: '',
    email: '',
    type: '',
    createdAt: this.getDate()
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private firebaseDB: FirebaseDbProvider,
              public auth : AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  getDate() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime
  }

  register() {
    this.firebaseDB.createUser(this.user)
      .then(() => {
        this.auth.registerLoginUser(this.user.email, '123456')
          .then(()=> {
            console.log('Usuario creado!')
          });
      });
  }
}
