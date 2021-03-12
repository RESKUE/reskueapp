import 'react-native';
import renderer from 'react-test-renderer'; // must be imported after react-native
import React from 'react';
import App from '../src/App';

it('app renders correctly', () => {
  renderer.create(<App />);
});
