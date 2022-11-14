import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as AuthSelectors from "../../auth/store/auth.selectors";
import * as fromApp from "../../store/app.reducer";


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output()  sideNavClose = new EventEmitter<void>();
  isAuth$!:Observable<boolean>;

  constructor(private authService:AuthService,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(AuthSelectors.isAuth);
  }

  onClose(){
    this.sideNavClose.emit();
  }

  onLogout(){
    this.authService.logout();
  } 
  
}
