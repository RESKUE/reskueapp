import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CommentListScreen from '../src/screens/list/CommentListScreen';

it('comment list screen renders correctly', () => {
  renderer.create(<CommentListScreen />);
});
