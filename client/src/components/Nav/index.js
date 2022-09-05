import React, { useState } from 'react';
import { AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
  Tooltip,
  Menu,  
  Tab,
  Tabs} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom'

import Auth from '../../utils/auth';

const drawerWidth = 240;
const navItems  = [ {title:'Login', value: 1}, {title:'Register', value: 2} ];
const settings = ['Profile', 'Account', 'Logout'];

function Nav(props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const user = Auth.loggedIn();
  const {data: {username, id}} = Auth.getProfile();
  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substring(1);
  const [value, setValue] = useState(path);
  
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    console.log(event.currentTarget)
    setAnchorElUser(null);
  };
  
  const navBar = user ? (
    <>
      <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
    </>
  ) : (
    <>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            name="home"
            onClick={handleChange}
            aria-slected={path === 'home'}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <a
              href='/'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Media Base
            </a>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}> 
            <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs">
              {navItems.map((item) => (
                <Tab href={`/${item.title}`} value={item.title} label={item.title} style={{ fontSize:20, textDecoration: 'none', color: 'inherit' }} />
              ))}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
      </>
  );

  return navBar;
};

export default Nav;
