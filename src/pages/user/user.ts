import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {RegisterPage} from "../register/register";
import {User} from "../../models/user";
import {UpdatePage} from "../update/update";
import { AlertController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  users: any[] = [];
  isMaster: boolean = false;
  public currentUser;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbFirebase :FirebaseDbProvider,
              private alertCtrl: AlertController,
              private auth: AuthProvider,
              public firebaseDb: FirebaseDbProvider) {
    this.dbFirebase.getUsers().subscribe(users=>{
      this.users = users;
    });
    this.optionDeleteUpdate();
  }

  openRegister() {
    this.navCtrl.push(RegisterPage);
  }

  optionDeleteUpdate() {
    this.currentUser = this.auth.getCurrentUser();
    this.firebaseDb.getUser(this.currentUser.uid).subscribe(user=>{
      if (user[5] == 'MASTER') {
        this.isMaster = true;
      }
    });
  }

  deleteUser(idx: string) {
    let alert = this.alertCtrl.create({
      title: 'Advertencia',
      message: 'Desea borrar a este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminar clicked');
            this.dbFirebase.deleteUser(idx);
          }
        }
      ]
    });
    alert.present();
  }

  editUser(user: User) {
    this.navCtrl.push(UpdatePage, {'user': user});
  }
}
