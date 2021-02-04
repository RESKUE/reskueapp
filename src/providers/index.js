import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthProvider, AuthService} from '@ilt-pse/react-native-kueres';
import theme from './Theme';

const authService = new AuthService({});

export default function Providers({children}) {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider authService={authService}>{children}</AuthProvider>
    </PaperProvider>
  );
}
