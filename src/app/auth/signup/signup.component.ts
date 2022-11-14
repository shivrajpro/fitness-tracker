import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UISelectors from '../../shared/store/ui.selectors';
import * as fromApp from "../../store/app.reducer";

import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate!: Date;
  isLoading$!: Observable<boolean>;

  constructor(private authService: AuthService,
    private store:Store<{ui:fromApp.AppState}>
    ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    
    this.isLoading$ = this.store.select(UISelectors.isLoading);
  }

  onSubmit(form:NgForm){
    console.log('>> form',form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
    
  }
}
