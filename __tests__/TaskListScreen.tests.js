import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import TaskListScreen from '../src/screens/list/TaskListScreen';
import {AuthContext} from '@ilt-pse/react-native-kueres';

it('task list screen renders correctly', () => {
  renderer.create(
    <AuthContext.Provider value={{clientRoles: []}}>
      <TaskListScreen />
    </AuthContext.Provider>,
  );
});
