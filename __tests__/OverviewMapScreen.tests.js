import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import OverviewMapScreen from '../src/screens/map/OverviewMapScreen';

it('overview map screen renders correctly', () => {
  renderer.create(<OverviewMapScreen />);
});
