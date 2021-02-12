import * as fromSpinner from './spinner.actions';

describe('loadSpinners', () => {
  it('should return an action', () => {
    expect(fromSpinner.loadSpinners().type).toBe('[Spinner] Load Spinners');
  });
});
