import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import React from 'react';
import OverviewMapScreen from '../src/screens/map/OverviewMapScreen';

it('overview map screen renders correctly', () => {
  render(
    <Provider>
      <OverviewMapScreen />
    </Provider>,
  );
});
