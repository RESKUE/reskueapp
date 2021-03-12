import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import FloatingWhiteButton from '../src/components/FloatingWhiteButton';

it('floating white button renders correctly', () => {
  renderer.create(<FloatingWhiteButton />);
});
