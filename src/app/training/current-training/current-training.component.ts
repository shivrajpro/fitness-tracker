import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingDialogComponent } from '../stop-training-dialog/stop-training-dialog.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: string | number | NodeJS.Timer | undefined;
  @Output() trainingExit = new EventEmitter<void>();

  constructor(public dialog: MatDialog, private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {

    const duration = this.trainingService.getRunningExercise().duration || 0;
    const step = (duration/100)*1000;
  
    this.timer = setInterval(() => {
      this.progress += 5;

      if (this.progress >= 100){
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop(){
    clearInterval(this.timer);

    const dialogRef = this.dialog.open(StopTrainingDialogComponent,{
      data:{
        progress: this.progress
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.trainingService.cancelExercise(this.progress);
      else
        this.startOrResumeTimer();
    });    
  }
}
