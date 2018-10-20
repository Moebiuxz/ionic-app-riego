import { Component } from '@angular/core';
import { Platform, MenuController, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";
import {ViewChild} from '@angular/core';
// servicios
import { AuthProvider } from '../providers/auth/auth';
import {UserPage} from "../pages/user/user";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;

  rootPage:any = '';

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private auth: AuthProvider,
              private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.auth.Session.subscribe(session=>{
        if(session){
          this.rootPage = TabsPage;
        }
        else{
          this.rootPage = LoginPage;
        }

      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  logout(){
    this.auth.logout();
    this.menuCtrl.close();
  }

  openPage() {
    this.navCtrl.push(UserPage);
    this.menuCtrl.close();
  }
}

