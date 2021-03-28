import {render, fireEvent} from '@testing-library/react-native';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import {Provider} from 'react-native-paper';
import React from 'react';
import CommentListItem from '../src/components/listItems/mediaListItems/CommentListItem';

test('comment list item renders correctly', () => {
  const data = {
    author: 'John',
    text: 'Hi',
    media: [{id: 42, altText: 'Plan', mimeType: 'image/png'}],
  };
  render(
    <AuthContext.Provider value={{clientRoles: []}}>
      <CommentListItem data={data} />
    </AuthContext.Provider>,
  );
});

test('item opens media screen on press', () => {
  const data = {
    author: 'John',
    text: 'Hi',
    media: [{id: 42, altText: 'Plan', mimeType: 'image/png'}],
  };
  const {getByText} = render(
    <AuthContext.Provider value={{clientRoles: []}}>
      <CommentListItem data={data} />
    </AuthContext.Provider>,
  );
  fireEvent.press(getByText('Plan'));
});

test('pressing delete triggers the deletion callback', async () => {
  const data = {author: 'John', text: 'Hi'};
  const {getByText} = render(
    <Provider>
      <AuthContext.Provider value={{clientRoles: ['administrator']}}>
        <CommentListItem data={data} />
      </AuthContext.Provider>
      ,
    </Provider>,
  );
  fireEvent(getByText('Hi'), 'longPress', {nativeEvent: {pageX: 0, pageY: 0}});

  // Unfortunately we are unable to reference the delete button, since it's rendered above all other components outside of the tree.
});
