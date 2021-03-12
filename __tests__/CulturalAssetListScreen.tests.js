import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CulturalAssetListScreen from '../src/screens/list/CulturalAssetListScreen';
import {AuthContext} from '@ilt-pse/react-native-kueres';

it('cultural asset list screen renders correctly', () => {
  renderer.create(
    <AuthContext.Provider value={{clientRoles: []}}>
      <CulturalAssetListScreen />
    </AuthContext.Provider>,
  );
});
