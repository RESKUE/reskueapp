import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import React from 'react';
import TaskListScreen from '../src/screens/list/TaskListScreen';

it('task list screen renders correctly', () => {
  render(
    <Provider>
      <AuthContext.Provider value={{clientRoles: []}}>
        <TaskListScreen />
      </AuthContext.Provider>
    </Provider>,
  );
});
