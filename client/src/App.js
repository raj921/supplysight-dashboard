import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-50">
        <Dashboard />
      </div>
    </ApolloProvider>
  );
}

export default App;
