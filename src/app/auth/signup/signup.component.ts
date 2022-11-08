import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate!: Date;

  loginForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('')
  })
  }

  onSubmit(form:NgForm){
    console.log('>> form',form);
    
  }

  onLogin(){
    console.log('loginform',this.loginForm);
    
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }  
}
