import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthProvider, AuthService} from '@ilt-pse/react-native-kueres';

const authService = new AuthService({});

export default function Providers({children}) {
  return (
    <PaperProvider>
      <AuthProvider authService={authService}>{children}</AuthProvider>
    </PaperProvider>
  );
}
