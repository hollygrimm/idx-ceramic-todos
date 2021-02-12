
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { serializeError } from 'serialize-error';
import { map, mapTo, tap, switchMap, catchError } from 'rxjs/operators';

import { of, from } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';

import { TaskService } from '../../services/task.service';

import * as fromStore from '../reducers';
import { Store, select } from '@ngrx/store';
import { TaskActions } from '../actions';
import { ErrorActions, SpinnerActions, SnackBarActions } from '../../../core/store/actions';
import { AppearanceColor, SnackBarInterface } from '../../../core/models';

@Injectable()
export class TaskEffects {
  constructor(
    private store$: Store<fromStore.AppState>,
    private taskSrv: TaskService,
    private actions$: Actions,
    private router: Router,
    private dialog: MatDialog
  ) { }


  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      switchMap(action => from(this.taskSrv.createTask(action.payload))),
      tap(id => console.log(`Creating Task id: ${id}`)),
      map((task) => {
        return TaskActions.createTaskSuccess({ task: task });
      }),
      catchError((error) =>
        of(this.handleError(error), SpinnerActions.hide()),
      )
    )
  );

  appendCreatedTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTaskSuccess),
      switchMap(action => from(this.taskSrv.appendTask(action.task))),
      tap(id => console.log(`Updating Task id: ${id}`)),
      map((taskList) => {
        return TaskActions.appendCreatedTaskSuccess({ tasks: taskList });
      }),
      catchError((error) =>
        of(this.handleError(error), SpinnerActions.hide()),
      )
    )
  );

  setTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.appendCreatedTaskSuccess),
      switchMap(action => from(this.taskSrv.setTasks(action.tasks))),
      map((docId) => {
        return TaskActions.setTasksSuccess();
      }),
      catchError((error) =>
        of(this.handleError(error), SpinnerActions.hide()),
      )
    )
  );

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks, TaskActions.setTasksSuccess),
      switchMap(() =>
        this.taskSrv.getTaskList().pipe(
          tap(tasks => console.log('tasks:', tasks)),
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError((err: Error) => of(this.handleError(err), SpinnerActions.hide()))
        )
      )
    ));

  showSpinner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask, TaskActions.loadTasks
      ),
      // Related to the operators mapTo and concatMapTo. These operators map to static values.
      mapTo(SpinnerActions.show())
    )
  );

  hideSpinner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasksSuccess,
      ),
      mapTo(SpinnerActions.hide())
    )
  );

  showSnackbarOnCreateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTaskSuccess),
      map((payload) => {

        const msg: SnackBarInterface = {
          message: `New task has been created successfully: Address: ${payload.task.id}`,
          color: AppearanceColor.Success
        };

        return SnackBarActions.open({ payload: msg });
      })
    )
  );

  private handleError(error: Error) {
    const friendlyErrorMessage = serializeError(error).message;
    return ErrorActions.errorMessage({ errorMsg: friendlyErrorMessage });
  }
}
