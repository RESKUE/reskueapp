import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import React from 'react';
import CulturalAssetDetailScreen from '../src/screens/detail/CulturalAssetDetailScreen';

it('cultural asset detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  render(
    <Provider>
      <AuthContext.Provider value={{clientRoles: []}}>
        <CulturalAssetDetailScreen route={route} />
      </AuthContext.Provider>
    </Provider>,
  );
});
