import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingDialogComponent } from './stop-training-dialog/stop-training-dialog.component';
import { trainingReducer } from './store/training.reducer';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    NewTrainingComponent,
    StopTrainingDialogComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training',trainingReducer)
  ]
})
export class TrainingModule { }
