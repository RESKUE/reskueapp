import Task from '../src/models/Task';

it('helpers needed calculation', () => {
  const data = {numOfHelpersRecommended: 10, helper: [{}, {}, {}]};
  const task = new Task(data);
  expect(task.getHelpersNeeded()).toBe(7);
});
