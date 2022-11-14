import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as fromApp from "../app.reducer";
import { UiService } from '../shared/ui.service';
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
    private afAuth:AngularFireAuth,
    private uiService: UiService,
    private store:Store<{ui:fromApp.State}>
    ) { }

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
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type:'START_LOADING'});

    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then((result)=>{
      // console.log('result',result);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type:'STOP_LOADING'});
    }).catch(error=>{
      // console.log(error);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type:'STOP_LOADING'});
      this.uiService.showSnackbar(error.message, null, 3000);
    })
  }

  login(authData:AuthData){
    // this.user = {
    //   email:authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // }
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type:'START_LOADING'});

    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then((result)=>{
      // console.log('result',result);
      this.store.dispatch({type:'STOP_LOADING'});
      this.uiService.loadingStateChanged.next(false);
    }).catch(error=>{
      // console.log(error);
      this.uiService.showSnackbar(error.message, null, 3000);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type:'STOP_LOADING'});
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
