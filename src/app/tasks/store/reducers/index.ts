import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers,
} from '@ngrx/store';

import * as fromRoot from '../../../core/store/reducers';
import * as fromTasks from './task.reducer';


export interface TaskState {
  tasks: fromTasks.State;
}

export interface AppState extends fromRoot.AppState {
  task: TaskState;
}

export function reducers(state: TaskState | undefined, action: Action) {
  return combineReducers({
    tasks: fromTasks.reducer
  })(state, action);
}

export const selectTaskState = createFeatureSelector<AppState, TaskState>(
  'task'
);

export const getTaskEntitiesState = createSelector(selectTaskState, state => state.tasks);

export const {
  selectIds: getTaskKeys,
  selectEntities: getTaskEntities,
  selectAll: getAllTasks,
  selectTotal: getTotalTasks,
} = fromTasks.adapter.getSelectors(getTaskEntitiesState);

export const isTasksLoaded = createSelector(getTaskEntitiesState, state => state.loaded);
export const getSelectedTask = createSelector(getTaskEntitiesState, state => state.selectedTask);

export const getSelectedTaskWrapper = createSelector(
  getTaskEntities,
  fromRoot.selectRouteParams,
  (entities, params) => params && entities[params.id]
);


