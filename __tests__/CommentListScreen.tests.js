import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CommentListScreen from '../src/screens/list/CommentListScreen';
import {AuthContext} from '@ilt-pse/react-native-kueres';

it('comment list screen renders correctly', () => {
  const route = {params: {assetId: 1}};
  renderer.create(
    <AuthContext.Provider value={{clientRoles: []}}>
      <CommentListScreen route={route} />
    </AuthContext.Provider>,
  );
});
