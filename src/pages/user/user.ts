import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  users: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbFirebase :FirebaseDbProvider) {
    this.dbFirebase.getUsers().subscribe(users=>{
      this.users = users;
    });
  }

  openRegister() {
    this.navCtrl.push(RegisterPage);
  }
}
