import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output()  sideNavClose = new EventEmitter<void>();
  isAuth!:boolean;
  authStatusSub!:Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.authChange.subscribe((authStatus)=>{
      this.isAuth = authStatus;
    })
  }

  onClose(){
    this.sideNavClose.emit();
  }

  onLogout(){
    this.authService.logout();
  } 
  
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }  
}
