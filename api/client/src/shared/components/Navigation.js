import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Hidden,
  IconButton,
  SwipeableDrawer,
  Tabs,
  Tab
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons'; 
import { makeStyles } from '@material-ui/core/styles';

import LoginButton from './LoginButton';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  nav: {
  },
  navTabs: {
    flexGrow: 1,
    '&:hover': {
      color: 'inherit',
      'text- decoration': 'none',
    }
  },
  verticalNavTabs: {
    textAlign: "left"
  }
});

const Navigation = ({ user, onLogin, onLogout, ...props }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(window.location.pathname);
  const [menuDrawerOpen, toggleMenuDrawerOpen] = React.useState(false);

  const RouterLinks = {
    '/': 'Dashboard',
    '/trips': 'Trips',
    '/users': 'Users',
  };
  const TabRouterLink = ({value, ...props}) => <Tab {...props} value={value} to={value} component={RouterLink} color='inherit' />
  const tabRouterLinks = Object.keys(RouterLinks).map(path => (<TabRouterLink label={RouterLinks[path]} key={path} value={path} />));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    toggleMenuDrawerOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Hidden mdUp>
            <div className={classes.navTabs}>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => toggleMenuDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </div>
          </Hidden>
          <Hidden smDown>
            <Tabs value={value} onChange={handleChange} aria-label="nav-bar" className={classes.navTabs}>
              {tabRouterLinks}
            </Tabs>
          </Hidden>
          <LoginButton user={user} onLogin={onLogin} onLogout={onLogout} />
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        bgcolor='primary'
        anchor='left'
        open={menuDrawerOpen}
        onOpen={() => toggleMenuDrawerOpen(true)}
        onClose={() => toggleMenuDrawerOpen(false)}
      >
        <Tabs value={value} onChange={handleChange} aria-label="nav-bar" className={classes.verticalNavTabs} orientation='vertical'>
          {tabRouterLinks}
        </Tabs>
      </SwipeableDrawer>
    </div>
  );
}

export default withRouter(Navigation);
