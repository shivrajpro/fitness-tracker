import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/auth/models/exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from "../store/training.state";
import * as TrainingSelectors from "../store/training.selectors";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private trainingService: TrainingService,
    private store:Store<fromTraining.State>
    ) {}


  ngOnInit() {
    this.trainingService.fetchCompletedOrCancelledExercises();

    this.store.select(TrainingSelectors.getFinishedExercises)
    .subscribe((exercises:any)=>{
      this.dataSource.data = exercises;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(query:string){
    this.dataSource.filter = query.toLowerCase().trim();
  }
}
