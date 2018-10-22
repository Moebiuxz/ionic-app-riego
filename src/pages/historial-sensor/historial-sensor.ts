import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";

@Component({
  selector: 'page-historial-sensor',
  templateUrl: 'historial-sensor.html',
})
export class HistorialSensorPage {
  sensors: any[] = [];

  constructor(public navCtrl: NavController,
              public dbFirebase :FirebaseDbProvider) {

    this.dbFirebase.getHistorialSensor().subscribe(sensors=>{
      this.sensors = sensors;
    });
  }

}
