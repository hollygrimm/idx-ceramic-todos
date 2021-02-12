import { Injectable } from '@angular/core';
import { serializeError } from 'serialize-error';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromStore from '../reducers';

import { IdxProviderService } from '../../services/idx-provider.service';
import { IdxGatewayActions, SpinnerActions, ErrorActions } from '../actions';
import { of, from } from 'rxjs';
import { switchMap, map, mapTo, tap, catchError } from 'rxjs/operators';

@Injectable()
export class IdxGatewayEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<fromStore.AppState>,
    private router: Router,
    private idxProviderSrv: IdxProviderService) { }

  idxConnect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdxGatewayActions.idxConnect),
      switchMap(action => from(this.idxProviderSrv.authenticate())),
      tap(did => console.log(`Connected with DID: ${did}`)),
      map(did => IdxGatewayActions.idxConnectSuccess({ did: did })),

      catchError((error) =>
        of(this.handleError(error)),
      )
    )
  );

  idxLoadBasicProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdxGatewayActions.idxConnectSuccess, IdxGatewayActions.idxUpdateBasicProfileSuccess, IdxGatewayActions.idxLoadBasicProfile),
      switchMap(action => from(this.idxProviderSrv.loadProfile())),
      tap(basicProfile => console.log(`Loaded Basic Profile`)),
      map(basicProfile => IdxGatewayActions.idxLoadBasicProfileSuccess({
        basicProfile: basicProfile
      })),
      catchError((error) =>
        of(this.handleError(error), SpinnerActions.hide()),
      )
    )
  );

  idxUpdateBasicProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdxGatewayActions.idxUpdateBasicProfile),
      switchMap(action => from(this.idxProviderSrv.updateProfile(action.name))),
      tap(docId => console.log(`Updated Basic Profile`)),
      map(docId => {
        return IdxGatewayActions.idxUpdateBasicProfileSuccess({docId:docId});
      }),
      catchError((error) =>
        of(this.handleError(error), SpinnerActions.hide()),
      )
    )
  );

  showSpinner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdxGatewayActions.idxConnectSuccess, IdxGatewayActions.idxUpdateBasicProfile),
      mapTo(SpinnerActions.show())
    )
  );

  hideSpinner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdxGatewayActions.idxLoadBasicProfileSuccess),
      mapTo(SpinnerActions.hide())
    )
  );

  connectRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IdxGatewayActions.authenticationRedirect),
        tap(_ => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  private handleError(error: Error) {
    const friendlyErrorMessage = serializeError(error).message;
    return ErrorActions.errorMessage({ errorMsg: friendlyErrorMessage });
  }

}
