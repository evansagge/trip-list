import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const LoginButton = ({ user, onLogin, onLogout }) => {
  if (user) {
    return (
      <div>
        <Button color='inherit' onClick={onLogout}>
          <AccountCircleIcon />
          Logout
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button color='inherit' component={RouterLink} to='/sign-in'>
          Sign In
        </Button>
        <Button color='inherit' component={RouterLink} to='/sign-up'>
          Sign Up
        </Button>
      </div>
    );
  }
};

export default LoginButton;
