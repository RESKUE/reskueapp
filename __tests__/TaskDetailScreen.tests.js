import {render} from '@testing-library/react-native';
import React from 'react';
import TaskDetailScreen from '../src/screens/detail/TaskDetailScreen';

it('task detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  render(<TaskDetailScreen route={route} />);
});
