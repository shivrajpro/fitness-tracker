import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './models/auth-data.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!:User | null;
  authChange = new Subject<boolean>();

  constructor(private router:Router) { }

  registerUser(authData:AuthData){
    this.user = {
      email:authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }

    this.authSuccess();
  }

  authSuccess() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  login(authData:AuthData){
    this.user = {
      email:authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.authSuccess();
  }

  logout(){
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login'])
  }

  getUser(){
    return { ...this.user }
  }

  isAuth(){
    return this.user != null;
  }
}
