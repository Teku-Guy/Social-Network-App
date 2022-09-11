import React, { useState } from 'react';
import { AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Avatar,
  ListItemIcon,
  Tooltip,
  Menu,  
  Tab,
  Tabs} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

import Auth from '../../utils/auth';

const navItems  = [ {title:'Login', value: 1}, {title:'Register', value: 2} ];

function Nav(props) {
  const user = Auth.loggedIn();
  const {data: {username}} = Auth.getProfile();
  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substring(1);
  const [value, setValue] = useState(path);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const navBar = user ? (
    <>
    <AppBar component="nav">
      <Toolbar>
        <Typography
            variant="h4"
            component="div"
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
            <Tooltip title="Open settings">
              <IconButton 
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar alt="Remy Sharp" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem key='username' disabled textAlign="center">
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                {username}
              </MenuItem>
              <MenuItem key='Profile' onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem key='Account' onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem key='Logout' onClick={Auth.logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
      </Toolbar>
    </AppBar>
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
