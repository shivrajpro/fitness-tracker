import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as AuthSelectors from "../../auth/store/auth.selectors";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth$!:Observable<boolean>;

  constructor(private authService:AuthService, private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(AuthSelectors.isAuth);
  }

  onToggleSidenav(){
    this.sideNavToggle.emit();
  }
  
  onLogout(){
    this.authService.logout();
  }
}
