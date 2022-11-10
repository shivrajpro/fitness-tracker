import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth!:boolean;
  authStatusSub!:Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.authChange.subscribe((authStatus)=>{
      this.isAuth = authStatus;
    })
  }

  onToggleSidenav(){
    this.sideNavToggle.emit();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
  
  onLogout(){
    this.authService.logout();
  }
}
