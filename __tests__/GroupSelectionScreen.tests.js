import {render} from '@testing-library/react-native';
import React from 'react';
import GroupSelectionScreen from '../src/screens/selection/GroupSelectionScreen';

it('group selection screen renders correctly', () => {
  render(<GroupSelectionScreen />);
});
