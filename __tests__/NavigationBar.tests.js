import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import NavigationBar from '../src/components/baseComponents/NavigationBar';

it('navigation bar renders correctly', () => {
  renderer.create(<NavigationBar />);
});
