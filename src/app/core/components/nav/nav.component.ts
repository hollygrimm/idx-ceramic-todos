import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { BasicProfile } from '../../models';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../store';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  profile$: Observable<BasicProfile>;
  idxConnected$: Observable<boolean>;

  menuItems = ['home', 'tasks'];

  ngOnInit() {
    this.idxConnected$ = this.store$.pipe(select(fromRoot.getIdxConnected));
    this.profile$ = this.store$.pipe(select(fromRoot.getBasicProfile));
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private store$: Store<fromRoot.AppState>) { }

}
