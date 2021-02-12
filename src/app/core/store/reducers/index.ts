import {
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
  Action,
  ActionReducerMap,
} from '@ngrx/store';

import { InjectionToken } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';

import { environment } from '../../../../environments/environment';
import * as fromSpinner from './spinner.reducer';
import * as fromError from './error.reducer';
import * as fromIdxGateway from './idx-gateway.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
  spinner: fromSpinner.SpinnerState;
  error: fromError.ErrorState;
  idxProvider: fromIdxGateway.IdxGatewayState;
}

export const ROOT_REDUCERS =
  new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers token', {
    factory: () => ({
      router: fromRouter.routerReducer,
      spinner: fromSpinner.reducer,
      error: fromError.reducer,
      idxProvider: fromIdxGateway.reducer,
    }),
  });

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];

export const selectRouterState = createFeatureSelector<AppState,
  fromRouter.RouterReducerState<any>>('router');

export const {
  selectQueryParams,
  selectRouteParams,
  selectRouteData,
  selectUrl,
} = fromRouter.getSelectors(selectRouterState);

export const selectSpinnerState = createFeatureSelector<AppState, fromSpinner.SpinnerState>(
  'spinner'
);

export const getSpinnerShow = createSelector(
  selectSpinnerState,
  fromSpinner.getSpinnerShow
);

export const selectErrorState = createFeatureSelector<AppState, fromError.ErrorState>(
  'error'
);

export const getError = createSelector(
  selectErrorState,
  fromError.getError
);

export const selectIdxGatewayState = createFeatureSelector<AppState, fromIdxGateway.IdxGatewayState>(
  'idxProvider'
);

export const getIdxConnected = createSelector(
  selectIdxGatewayState,
  fromIdxGateway.getIdxConnected
);

export const getDid = createSelector(
  selectIdxGatewayState,
  fromIdxGateway.getDid
);

export const getBasicProfile = createSelector(
  selectIdxGatewayState,
  fromIdxGateway.getBasicProfile
);
