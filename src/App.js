import React from 'react';
import Providers from './providers';
import Router from './routing/Router';

export default function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}
