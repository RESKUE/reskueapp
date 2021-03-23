import {render} from '@testing-library/react-native';
import React from 'react';
import CommentListItem from '../src/components/listItems/mediaListItems/CommentListItem';
import {AuthContext} from '@ilt-pse/react-native-kueres';

it('comment list item renders correctly', () => {
  const data = {author: 'John', text: 'Hi'};
  render(
    <AuthContext.Provider value={{clientRoles: []}}>
      <CommentListItem data={data} />
    </AuthContext.Provider>,
  );
});
