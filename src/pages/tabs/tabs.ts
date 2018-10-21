import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";

// components
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HistorialRiegoPage} from "../historial-riego/historial-riego";
import {DashboardPage} from "../dashboard/dashboard";
import {HistorialSensorPage} from "../historial-sensor/historial-sensor";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  currentUser: any;
  user: any[] = [];
  dashboard: any;
  historialRiego: any;
  historialSensor: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth : AuthProvider,
              public firebaseDb: FirebaseDbProvider,
              public toastCtrl: ToastController) {
    this.currentUser = this.auth.getCurrentUser();
    this.firebaseDb.getUser(this.currentUser.uid).subscribe(user=>{
      this.user = user;
    });
    this.dashboard = DashboardPage;
    this.historialRiego = HistorialRiegoPage;
    this.historialSensor = HistorialSensorPage
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

}
