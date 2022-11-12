import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!:FormGroup;
  isLoading = false;
  loadingSubs!:Subscription

  constructor(private authService:AuthService,
    private uiService:UiService
    ) { }

  ngOnInit(): void {
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
