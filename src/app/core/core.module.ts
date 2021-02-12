import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//ng-rx
import * as fromRootStore from './store';
import { ROOT_REDUCERS, metaReducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';

import { IdxGatewayEffects } from './store/effects/idx-gateway.effects';
import { ErrorEffects } from './store/effects/error.effects';
import { SpinnerEffects } from './store/effects/spinner.effects';

import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './components/home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSpinner } from '@angular/material/progress-spinner';

import { AppErrorHandler } from './services/app-error-handler.service';
import { HttpErrorInterceptor } from './services/http-error.interceptor';

// Components
import { NavComponent } from './components/nav/nav.component';
import { MySnackBarComponent } from './components/my-snack-bar/my-snack-bar.component';
import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component';
import { SnackBarEffects } from './store/effects/snack-bar.effects';

export const COMPONENTS = [
  NavComponent,
  HomeComponent,
  MySnackBarComponent,
  NotFoundPageComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,

    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
    StoreDevtoolsModule.instrument({
      name: 'Tasks State',
      // FIXME: logOnly: environment.production,
    }),    
    EffectsModule.forRoot(fromRootStore.effects),
    EffectsModule.forFeature([IdxGatewayEffects, ErrorEffects, SpinnerEffects, SnackBarEffects])
  ],
  entryComponents: [
    MySnackBarComponent,
    MatSpinner
  ],
  providers: [
    // register the GlobalErrorHandler provider
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
})
export class CoreModule { }
