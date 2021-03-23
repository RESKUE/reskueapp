import {render} from '@testing-library/react-native';
import React from 'react';
import MediaListScreen from '../src/screens/list/MediaListScreen';
import {AuthContext} from '@ilt-pse/react-native-kueres';

it('media list screen renders correctly', () => {
  const route = {params: {assetId: 1, mediaId: 1}};
  render(
    <AuthContext.Provider value={{clientRoles: []}}>
      <MediaListScreen route={route} />
    </AuthContext.Provider>,
  );
});
