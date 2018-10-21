import { Component } from '@angular/core';
import {Platform, MenuController, Nav, NavController, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";
import {ViewChild} from '@angular/core';
// servicios
import { AuthProvider } from '../providers/auth/auth';
import {UserPage} from "../pages/user/user";
import {FirebaseDbProvider} from "../providers/firebase-db/firebase-db";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  isNormal: boolean = false;
  public currentUser;
  public user;
  cont = 0;
  rootPage:any = '';

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private auth: AuthProvider,
              public firebaseDb: FirebaseDbProvider,
              private menuCtrl: MenuController,
              public toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.auth.Session.subscribe(session=>{
        if(session){
          this.cont ++;
          console.log('cont '+this.cont);
          if (this.cont == 1) {
            this.optionMenu();
          }
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

  optionMenu() {
    this.currentUser = this.auth.getCurrentUser();
    this.firebaseDb.getUser(this.currentUser.uid).subscribe(user=>{
      /*this.presentToast('Bienvenido '+user[4]+' '+user[3]);*/
      if (user[5] == 'NORMAL') {
        this.isNormal = true;
      } else {
        this.isNormal = false;
      }
    });
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  logout(){
    this.auth.logout();
    this.cont = 0;
    console.log('cont '+this.cont);
    this.menuCtrl.close();

  }

  openPage() {
    this.navCtrl.push(UserPage);
    this.menuCtrl.close();
  }
}

