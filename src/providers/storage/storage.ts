import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Platform} from "ionic-angular";
import {AuthProvider} from "../auth/auth";
import {FirebaseDbProvider} from "../firebase-db/firebase-db";

@Injectable()
export class StorageProvider {
  user: any;
  public currentUser;

  constructor(private storage: Storage,
              private platform: Platform,
              private auth: AuthProvider,
              public firebaseDb: FirebaseDbProvider) {

  }

  cargarStorage() {
    if(this.platform.is('cordova')) {
      // dispositivo
      this.storage.ready()
        .then( () => {
          this.storage.get('user')
            .then( user => {
              if (user) {
                this.user = user;
              } else {
                this.guardarStorage();
              }

            })
        })
    } else {
      // escritorio
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
      } else {
        this.guardarStorage();
      }

    }
  }

  guardarStorage() {
    if(this.platform.is('cordova')) {
      // dispositivo
      this.currentUser = this.auth.getCurrentUser();
      this.firebaseDb.getUser(this.currentUser.uid).subscribe(user=>{
        this.storage.ready()
          .then( () => {
            this.storage.set('user', user);
          })
      });

    } else {
      // escritorio
      this.currentUser = this.auth.getCurrentUser();
      this.firebaseDb.getUser(this.currentUser.uid).subscribe(user=>{
        localStorage.setItem('user', JSON.stringify(user));
      });

    }
  }
}
