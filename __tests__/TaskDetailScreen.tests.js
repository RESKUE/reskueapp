import {render} from '@testing-library/react-native';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import React from 'react';
import TaskDetailScreen from '../src/screens/detail/TaskDetailScreen';

it('task detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  render(
    <AuthContext.Provider value={{clientRoles: []}}>
      <TaskDetailScreen route={route} />
    </AuthContext.Provider>,
  );
});
