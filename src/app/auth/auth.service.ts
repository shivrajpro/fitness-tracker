import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
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
    private snackbar: MatSnackBar,
    private uiService: UiService
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
    this.uiService.loadingStateChanged.next(true);

    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then((result)=>{
      // console.log('result',result);
      this.uiService.loadingStateChanged.next(false);
    }).catch(error=>{
      // console.log(error);
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar(error.message, null, 3000);
    })
  }

  login(authData:AuthData){
    // this.user = {
    //   email:authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // }
    this.uiService.loadingStateChanged.next(true);

    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then((result)=>{
      // console.log('result',result);
      this.uiService.loadingStateChanged.next(false);
    }).catch(error=>{
      // console.log(error);
      this.uiService.showSnackbar(error.message, null, 3000);
      this.uiService.loadingStateChanged.next(false);
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
