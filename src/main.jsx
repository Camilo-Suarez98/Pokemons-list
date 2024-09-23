import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import PokemonDetails from './components/PokemonDetails.jsx';
import PokemonList from './components/PokemonList.jsx';

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <PokemonList />
      },
      {
        path: '/pokemon/:id',
        element: <PokemonDetails />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ApolloProvider>
  </StrictMode>,
);
