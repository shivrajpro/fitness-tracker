import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs";
import { UiService } from 'src/app/shared/ui.service';
import * as fromApp from "../../store/app.reducer";
import { AuthService } from '../auth.service';
import * as UI from '../../shared/store/ui.selectors'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!:FormGroup;
  isLoading = false;
  loadingSubs!:Subscription;
  isLoading$!: Observable<boolean>;
  // isLoading = false;

  constructor(private authService:AuthService,
    private uiService:UiService,
    private store:Store<{ui:fromApp.AppState}>
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(UI.isLoading);

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe((isLoading)=>{
      this.isLoading = isLoading;
    })

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

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

}
