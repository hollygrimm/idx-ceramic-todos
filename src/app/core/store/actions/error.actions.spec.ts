import * as fromError from './error.actions';

describe('loadErrors', () => {
  it('should return an action', () => {
    expect(fromError.loadErrors().type).toBe('[Error] Load Errors');
  });
});
