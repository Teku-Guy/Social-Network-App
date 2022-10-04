import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context"

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'

import {theme} from './utils/theme';
import { AuthProvider } from "./utils/AuthContext";
import  AppRouter from "./components/AppRouter";

const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    },
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client} >
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
