import React, { useContext, useState } from 'react';
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
  Tabs,
  Container} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
//remember to implement navLinks

import Auth from '../../utils/auth';
import { AuthContext } from '../../utils/AuthContext';
import { useQuery } from '@apollo/client';
import { FETCH_USER_AVATAR_QUERY } from '../../utils/queries';

const navItems  = [ {title:'Login', value: 1}, {title:'Register', value: 2} ];

function Nav(props) {
  const { user }  = useContext(AuthContext);
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

  // Fetch latest avatar to keep navbar up-to-date
  const { data } = useQuery(FETCH_USER_AVATAR_QUERY, {
    variables: { username: (user?.username ?? user?.data?.username) },
    skip: !(user?.username ?? user?.data?.username),
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const avatarUrl =
    data?.getUser?.profileImgUrl ||
    user?.profileImgUrl ||
    user?.data?.profileImgUrl ||
    '';
  const currentUsername = user?.username ?? user?.data?.username;
  const profile = () => {
    if (currentUsername) window.location.assign(`/user/${currentUsername}`);
  };
  const settings = () => {
    window.location.assign('/settings');
  };

  console.log(data);
  
  const isAuthed = !!(user && (user.username || user.data?.username));
  const navBar = isAuthed ? (
    <Container maxWidth="xl" sx={{ p:3 }}>
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
                <Avatar alt="Remy Sharp" src={avatarUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
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
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem key='username' disabled textAlign="center">
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                {currentUsername}
              </MenuItem>
              <MenuItem key='Profile' onClick={profile}>
                <Avatar src={avatarUrl} /> Profile
              </MenuItem>
              <MenuItem key='Account' onClick={settings}>
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
    </Container>
  ) : (
    <Container maxWidth="xl" sx={{ p:3 }}>
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
                <Tab key={item.title} href={`/${item.title}`} value={item.title} label={item.title} style={{ fontSize:20, textDecoration: 'none', color: 'inherit' }} />
              ))}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );

  return navBar;
};

export default Nav;
