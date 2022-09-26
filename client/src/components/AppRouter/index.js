import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Box from '@mui/material/Box';

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import SinglePost from "../../pages/SinglePost";
import Nav from "../Nav";
import Profile from "../../pages/Profile";
import Settings from "../../pages/Settings";
import AuthRoute from '../../utils/AuthRoute';

function AppRouter() {



  return (
    <Router>
      <Nav />
      <Box component="main" sx={{ pt:10, display: 'flex' }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<AuthRoute component={Login} />} />
          <Route exact path="/register" element={<AuthRoute component={Register} />} />
          <Route exact path="/posts/:postId" element={<SinglePost />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/user/:username" element={<Profile />} />
        </Routes>
      </Box>
    </Router>
  )
}

export default AppRouter;