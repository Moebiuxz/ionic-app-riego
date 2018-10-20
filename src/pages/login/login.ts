import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth : AuthProvider) {
  }

  login () {
    this.auth.loginUser(this.email, this.password ).then((user) => {
      console.log('Usuario logeado!.')
      }
    ).catch(err=>{
        console.log(err);
        console.log('Problema de autenticacion');
      })
  }

}
