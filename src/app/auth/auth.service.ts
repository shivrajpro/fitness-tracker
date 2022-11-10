import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from './models/auth-data.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!:User | null;
  authChange = new Subject<boolean>();

  constructor() { }

  registerUser(authData:AuthData){
    this.user = {
      email:authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }

    this.authChange.next(true);
  }

  login(authData:AuthData){
    this.user = {
      email:authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.authChange.next(true);

  }

  logout(){
    this.user = null;
    this.authChange.next(false);
  }

  getUser(){
    return { ...this.user }
  }

  isAuth(){
    return this.user != null;
  }
}
