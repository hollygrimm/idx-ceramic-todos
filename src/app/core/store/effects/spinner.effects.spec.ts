import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SpinnerEffects } from './spinner.effects';

describe('SpinnerEffects', () => {
  let actions$: Observable<any>;
  let effects: SpinnerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpinnerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SpinnerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
