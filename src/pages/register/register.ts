import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {AuthProvider} from "../../providers/auth/auth";

// components
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
  isMaster: boolean = false;
  public currentUser;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private firebaseDB: FirebaseDbProvider,
              public auth : AuthProvider,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
    this.optionDeleteUpdate();
  }

  optionDeleteUpdate() {
    this.currentUser = this.auth.getCurrentUser();
    this.firebaseDB.getUser(this.currentUser.uid).subscribe(user=>{
      if (user[5] == 'MASTER') {
        this.isMaster = true;
      }
    });
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

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error al crear el usuario',
      subTitle: 'El correo ya está en uso, por favor contacte al administrador',
      buttons: ['OK']
    });
    alert.present();
  }

  getDate() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime
  }

  register() {

    this.auth.registerLoginUser(this.user.email)
      .then((res)=>{
        console.log(res);
        this.user.idx = res.user.uid;
        console.log('El correo esta disponible');
        this.auth.sendPasswordReset(this.user.email);
        console.log('Se le envio el password');

        this.firebaseDB.createUser(this.user)
          .then(() => {
            this.presentToast('El usuario ha sido creado');
            this.closePage();
          });
      })
      .catch(err=> {
        console.log('Usuario no disponible');
        this.showAlert();
      });
  }
}
