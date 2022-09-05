import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Box, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import 'semantic-ui-css/semantic.min.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'

import {theme} from './utils/theme';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";

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
      <ApolloProvider client={client} >
        <Router>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ p:3 }}>
            <Nav />
            <Box component="main" sx={{ pt:10, display: 'flex' }}>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/posts/:postId" element={<SinglePost />} />
                  <Route exact path="/user/:userID" element={<Profile />} />
                </Routes>
            </Box>
          </Container>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
