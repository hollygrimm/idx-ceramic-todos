import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SnackBarEffects } from './snack-bar.effects';

describe('SnackBarEffects', () => {
  let actions$: Observable<any>;
  let effects: SnackBarEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SnackBarEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SnackBarEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
