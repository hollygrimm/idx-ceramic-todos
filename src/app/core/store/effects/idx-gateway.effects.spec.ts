import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IdxGatewayEffects } from './idx-gateway.effects';

describe('IdxGatewayEffects', () => {
  let actions$: Observable<any>;
  let effects: IdxGatewayEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IdxGatewayEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(IdxGatewayEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
