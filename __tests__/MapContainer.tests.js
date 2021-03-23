import {render} from '@testing-library/react-native';
import React from 'react';
import MapContainer from '../src/components/MapContainer';

it('map container renders correctly', () => {
  render(<MapContainer />);
});
