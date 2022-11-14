import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UIActions from '../shared/store/ui.actions';
import { UiService } from '../shared/ui.service';
import * as fromApp from "../store/app.reducer";
import { TrainingService } from '../training/training.service';
import { AuthData } from './models/auth-data.model';
import * as AuthActions from "./store/auth.actions";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, 
    private trainingServicee:TrainingService,
    private afAuth:AngularFireAuth,
    private uiService: UiService,
    private store:Store<fromApp.AppState>
    ) { }

  initAuthListener(){
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.store.dispatch(AuthActions.setAuthenticated({isAuthenticated:true}));
        this.router.navigate(['/training']);
      }else{
        this.store.dispatch(AuthActions.setAuthenticated({isAuthenticated:false}));
        this.router.navigate(['/login'])
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
    this.store.dispatch(UIActions.setLoading({isLoading:true}));

    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then((result)=>{
      // console.log('result',result);
      // this.uiService.loadingStateChanged.next(false);
          this.store.dispatch(UIActions.setLoading({isLoading:false}));
    }).catch(error=>{
      // console.log(error);
      // this.uiService.loadingStateChanged.next(false);
          this.store.dispatch(UIActions.setLoading({isLoading:false}));
      this.uiService.showSnackbar(error.message, null, 3000);
    })
  }

  login(authData:AuthData){
    // this.user = {
    //   email:authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // }
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(UIActions.setLoading({isLoading:true}));

    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then((result)=>{
      // console.log('result',result);
    this.store.dispatch(UIActions.setLoading({isLoading:false}));
      this.uiService.loadingStateChanged.next(false);
    }).catch(error=>{
      // console.log(error);
      this.uiService.showSnackbar(error.message, null, 3000);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(UIActions.setLoading({isLoading:false}));
    })
  }

  logout(){
    this.afAuth.signOut();
    this.store.dispatch(AuthActions.setAuthenticated({isAuthenticated:false}));
    this.router.navigate(['/login'])
    this.trainingServicee.cancelSubscriptions();
  }
}
