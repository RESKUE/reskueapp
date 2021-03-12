import Subtask from '../src/models/Subtask';

it('is complete if state is 0', () => {
  const data = {state: 0};
  const subtask = new Subtask(data);
  expect(subtask.isIncomplete()).toBe(true);
});
