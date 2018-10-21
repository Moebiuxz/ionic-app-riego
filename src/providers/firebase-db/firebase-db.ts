import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from "../auth/auth";

@Injectable()
export class FirebaseDbProvider {

  constructor(public afDB: AngularFireDatabase,
              public auth: AuthProvider) {
    console.log('Hello FirebaseDbProvider Provider');
  }

  createUser(user){
    return this.afDB.database.ref('users/'+user.idx).set(user);
  }

  getUsers(){
    return this.afDB.list('users/').valueChanges();
  }

  /*Parametros actuales*/
  getActualParameters(){
    return this.afDB.list('actual/').valueChanges();
  }

  /*Historial de riegos*/
  getHistorialRiego(){
    return this.afDB.list('log_riegos/').valueChanges();
  }

  deleteUser(idx: string) {
    this.afDB.list('users/'+idx).remove();
  }

  updateUser(user) {
    this.afDB.list('users/').set(user.idx, {user});
  }

  getUser(idx: string) {
    return this.afDB.list('users/'+idx).valueChanges();
  }
}
