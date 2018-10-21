import {Injectable} from '@angular/core';
// firebase
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Injectable()
export class AuthProvider {

  constructor(private afAuth :  AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  registerLoginUser(email: string){
    return this.afAuth.auth.createUserWithEmailAndPassword( email, '123456');
  }

  // obtener informacion de usuario
  getCurrentUser() {
    let user = firebase.auth().currentUser;
    console.log(user);
    return user;
  }

  // Login de usuario
  loginUser(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user=>Promise.resolve(user))
      .catch(err=>Promise.reject(err))
  }

  // Devuelve la session
  get Session(){
    return this.afAuth.authState;
  }

  // Logout de usuario
  logout(){
    this.afAuth.auth.signOut().then(()=>{
      // hemos salido
    })
  }

  sendPasswordReset(email: string) {
    this.afAuth.auth.sendPasswordResetEmail(email).then(function() {
      console.log('Se envio el password')
    }).catch(function(error) {
      console.log('Ocurrio un error.')
    });
  }
}
