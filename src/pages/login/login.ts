import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login () {
    console.log(this.email);
    console.log(this.password);
  }

}
