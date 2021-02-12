import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { TaskService } from '../../services/task.service';

import { Store, select } from '@ngrx/store';
import * as fromTask from '../../store/reducers';
import { TaskActions } from '../../store/actions';
import { TaskWrapperModel } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.scss']
})
export class ListDisplayComponent implements OnInit {
  tasks$: Observable<TaskWrapperModel[]>;

  displayedColumns: string[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store$: Store<fromTask.AppState>,
    private formBuilder: FormBuilder,
    private taskService: TaskService) { }

  frmGroup: FormGroup;

  ngOnInit(): void {
    this.tasks$ = this.store$.pipe(select(fromTask.getAllTasks));

    this.displayedColumns = ['title', 'text', 'date', 'completed'];

    this.store$.dispatch(TaskActions.loadTasks());

    this.frmGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: [''],
      date: [new Date(), [Validators.required]],
      completed: [false, [Validators.required]],
    });
  }

  addDoc(): void {
    const { fileArg, ...model } = this.frmGroup.value;
    this.frmGroup.reset({ title: '', text: '', date: new Date(), completed: false });
    this.store$.dispatch(TaskActions.createTask({ payload: model }));
  }

  updateTask = (row) => {
    const updatedTask = {
      task: {
        id: row.id,
        title: row.title,
        text: row.text,
        date: row.date,
        completed: !row.completed
      }
    };

    console.log(updatedTask);
    this.store$.dispatch(TaskActions.updateTask(updatedTask))
  };

}
