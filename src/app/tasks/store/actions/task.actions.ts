import { createAction, props } from '@ngrx/store';
import { TaskWrapperModel } from '../../models';

export const createTask = createAction('[Task/API] Create Task', props<{ payload: any }>());
export const createTaskSuccess =
  createAction('[Task/Command] Create Task Success', props<{ task: TaskWrapperModel }>());

export const appendCreatedTask = createAction('[Task/API] Add Created Task', props<{ task: TaskWrapperModel }>());
export const appendCreatedTaskSuccess = createAction('[Task/Command] Add Created Task Success', props<{ tasks: TaskWrapperModel[] }>());

export const setTasks = createAction('[Task/API] Set Tasks', props<{ tasks: TaskWrapperModel[] }>());
export const setTasksSuccess = createAction('[Task/Command] Set Tasks Success');

export const loadTasks = createAction('[Task/API] Load Tasks');
export const loadTasksSuccess = createAction('[Task/Command] Load Tasks Success', props<{ tasks: TaskWrapperModel[] }>());

export const initTasks = createAction('[Task/API] Init Tasks');
export const initTasksSuccess = createAction('[Task/Command] Init Tasks Success', props<{ tasks: TaskWrapperModel[] }>());

export const updateTask = createAction('[Task/API] Update Task', props<{ task: TaskWrapperModel }>());
export const updateTaskSuccess = createAction('[Task/Command] Update Task Success', props<{ task: TaskWrapperModel }>());
