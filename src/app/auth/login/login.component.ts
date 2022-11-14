import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";
import * as UISelectors from '../../shared/store/ui.selectors';
import * as fromApp from "../../store/app.reducer";
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  isLoading$!: Observable<boolean>;

  constructor(private authService:AuthService,
    private store:Store<{ui:fromApp.AppState}>
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(UISelectors.isLoading);

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onLogin(){
    this.authService.login({
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    })
  }

  hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }

}
