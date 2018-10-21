import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  parameters: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbFirebase :FirebaseDbProvider) {

    this.dbFirebase.getActualParameters().subscribe(parameters=>{
      this.parameters = parameters;
    });
  }


}
