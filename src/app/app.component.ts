import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";

// servicios
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = '';
  isLogged: boolean;

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
          this.rootPage = 'TabsPage';
          this.isLogged = true;
        }
        else{
          this.rootPage = LoginPage;
          this.isLogged = false;
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
}

