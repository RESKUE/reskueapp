import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {
  AuthProvider,
  AuthService,
  TokenStorage,
} from '@ilt-pse/react-native-kueres';
import authConfig from '../../auth.config.json';
import theme from './Theme';

const authService = new AuthService(authConfig, new TokenStorage());

export default function Providers({children}) {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider authService={authService}>{children}</AuthProvider>
    </PaperProvider>
  );
}
