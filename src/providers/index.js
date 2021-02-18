import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {
  AuthProvider,
  AuthService,
  TokenStorage,
} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';
import theme from './Theme';

const authService = new AuthService(appConfig.auth, new TokenStorage());

export default function Providers({children}) {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider authService={authService}>{children}</AuthProvider>
    </PaperProvider>
  );
}
