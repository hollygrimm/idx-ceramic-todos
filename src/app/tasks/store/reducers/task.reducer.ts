import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { TaskWrapperModel, TaskModel } from '../../models';
import { TaskActions } from '../actions';

export interface State extends EntityState<TaskWrapperModel> {
  loaded: boolean;
  selectedTask: TaskModel;
}

export const adapter: EntityAdapter<TaskWrapperModel> = createEntityAdapter<TaskWrapperModel>({
  selectId: (task: TaskWrapperModel) => task.id.substring(9),
});

export const initialState: State = adapter.getInitialState({
  loaded: false,
  selectedTask: null
});

export const reducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => adapter.addMany(tasks, state)),
);
