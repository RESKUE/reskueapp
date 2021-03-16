import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MediaListScreen from '../src/screens/list/MediaListScreen';
import {AuthContext} from '@ilt-pse/react-native-kueres';

it('media list screen renders correctly', () => {
  const route = {params: {assetId: 1, mediaId: 1}}
  renderer.create(
    <AuthContext.Provider value={{clientRoles: []}}>
      <MediaListScreen route={route} />
    </AuthContext.Provider>,
  );
});
