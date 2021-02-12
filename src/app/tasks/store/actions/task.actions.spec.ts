import * as fromTask from './task.actions';

describe('loadTasks', () => {
  it('should return an action', () => {
    expect(fromTask.loadTasks().type).toBe('[Task] Load Tasks');
  });
});
