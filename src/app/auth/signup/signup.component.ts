import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate!: Date;
  loadingSubs!:Subscription;
  isLoading = false;

  constructor(private authService: AuthService,
    private uiService:UiService
    ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe((isLoading)=>{
      this.isLoading = isLoading;
    })

  }

  onSubmit(form:NgForm){
    console.log('>> form',form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
    
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }
}
