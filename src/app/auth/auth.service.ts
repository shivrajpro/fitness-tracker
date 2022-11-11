import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TrainingService } from '../training/training.service';
import { AuthData } from './models/auth-data.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  isAuthenticated:boolean = false;

  constructor(private router:Router, 
    private trainingServicee:TrainingService,
    private afAuth:AngularFireAuth) { }

  initAuthListener(){
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      }else{
        this.authChange.next(false);
        this.router.navigate(['/login'])
        this.isAuthenticated = false;
        this.trainingServicee.cancelSubscriptions();        
      }
    })
  } 
    
  registerUser(authData:AuthData){
    // this.user = {
    //   email:authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // }

    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then((result)=>{
      console.log('result',result);
    }).catch(error=>{
      console.log(error);
    })
  }

  login(authData:AuthData){
    // this.user = {
    //   email:authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // }
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then((result)=>{
      console.log('result',result);
    }).catch(error=>{
      console.log(error);
    })
  }

  logout(){
    this.afAuth.signOut();
    this.authChange.next(false);
    this.router.navigate(['/login'])
    this.isAuthenticated = false;
    this.trainingServicee.cancelSubscriptions();
  }

  isAuth(){
    return this.isAuthenticated;
  }
}
