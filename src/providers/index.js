import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

export default function Providers({children}) {
  return <PaperProvider>{children}</PaperProvider>;
}
