import * as fromSnackBar from './snack-bar.actions';

describe('loadSnackBars', () => {
  it('should return an action', () => {
    expect(fromSnackBar.loadSnackBars().type).toBe('[SnackBar] Load SnackBars');
  });
});
