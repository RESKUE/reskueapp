import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import UsergroupCreationScreen from '../src/screens/creation/UsergroupCreationScreen';

it('usergroup creation screen renders correctly', () => {
  const route = {params: {id: 1}};
  renderer.create(<UsergroupCreationScreen route={route} />);
});
