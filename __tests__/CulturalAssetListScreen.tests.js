import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import React from 'react';
import CulturalAssetListScreen from '../src/screens/list/CulturalAssetListScreen';

it('cultural asset list screen renders correctly', () => {
  render(
    <Provider>
      <AuthContext.Provider value={{clientRoles: []}}>
        <CulturalAssetListScreen />
      </AuthContext.Provider>
    </Provider>,
  );
});
