import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CommentListItem from '../src/components/listItems/mediaListItems/CommentListItem';

it('comment list item renders correctly', () => {
  const data = {author: 'John', text: 'Hi'};
  renderer.create(<CommentListItem data={data} />);
});
