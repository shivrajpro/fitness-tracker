import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TrainingComponent } from './training.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingComponent,
    canActivate:[AuthGuard]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TrainingRoutingModule { }
