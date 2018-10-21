import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-historial-riego',
  templateUrl: 'historial-riego.html',
})
export class HistorialRiegoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('1');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialRiegoPage');
  }

}
