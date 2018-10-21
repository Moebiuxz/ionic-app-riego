import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";

@Component({
  selector: 'page-historial-riego',
  templateUrl: 'historial-riego.html',
})
export class HistorialRiegoPage {
  riegos: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbFirebase :FirebaseDbProvider) {
    this.dbFirebase.getHistorialRiego().subscribe(riegos=>{
      this.riegos = riegos;
    });
  }

}
