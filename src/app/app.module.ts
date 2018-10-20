import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// servicios
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import {UserPage} from "../pages/user/user";
import {TabsPage} from "../pages/tabs/tabs";
import {RegisterPage} from "../pages/register/register";


// firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyAoV4NyZhB1_lixk_V6Alge_0_3-SG8F_k",
  authDomain: "sistema-riego-iot.firebaseapp.com",
  databaseURL: "https://sistema-riego-iot.firebaseio.com",
  projectId: "sistema-riego-iot",
  storageBucket: "sistema-riego-iot.appspot.com",
  messagingSenderId: "705170471345"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    UserPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    UserPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FirebaseDbProvider
  ]
})
export class AppModule {}
