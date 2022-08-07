import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Container } from 'semantic-ui-react'


import 'semantic-ui-css/semantic.min.css'

import Home from "../../client/src/pages/Home";
import Login from "../../client/src/pages/Login";
import Register from "../../client/src/pages/Register";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <Container>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
