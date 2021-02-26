import React from 'react';
import {AuthContext} from '@ilt-pse/react-native-kueres';

export default function useRoles() {
  const {clientRoles} = React.useContext(AuthContext);
  const isAdmin = clientRoles.includes('administrator');
  const isHelper = clientRoles.includes('helper');
  return {isAdmin, isHelper};
}
