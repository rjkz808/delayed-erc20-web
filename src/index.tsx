import React from 'react';
import ReactDOM from 'react-dom';
import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import App from './App';
import './models/init';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

function getLibrary(provider: ethers.providers.ExternalProvider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
