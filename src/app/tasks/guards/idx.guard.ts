import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, tap, filter, switchMap, catchError } from 'rxjs/operators';
import * as fromRoot from '../../core/store';

@Injectable({
  providedIn: 'root',
})
export class IdxConnectGuard implements CanActivate {
  constructor(private store: Store<fromRoot.AppState>) { }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromRoot.getIdxConnected),
      tap(connected => {
        if (!connected) {
          this.store.dispatch(fromRoot.ErrorActions.errorMessage({ errorMsg: `Please Authenticate` }));
          this.store.dispatch(fromRoot.IdxGatewayActions.authenticationRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }


}
