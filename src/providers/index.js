import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {
  AuthProvider,
  AuthService,
  TokenStorage,
} from '@ilt-pse/react-native-kueres';
import theme from './Theme';
import authConfig from '../models/AuthConfig';

const authService = new AuthService(authConfig, new TokenStorage());

setInterval(() => {
  authService.refresh();
}, 1000 * 60);

export default function Providers({children}) {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider authService={authService}>{children}</AuthProvider>
    </PaperProvider>
  );
}
