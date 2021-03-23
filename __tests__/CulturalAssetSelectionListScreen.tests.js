import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import React from 'react';
import CulturalAssetSelectionListScreen from '../src/screens/list/CulturalAssetSelectionListScreen';

it('cultural asset selection list screen renders correctly', () => {
  const route = {params: {selectionType: 'parent'}};
  render(
    <Provider>
      <CulturalAssetSelectionListScreen route={route} />
    </Provider>,
  );
});
