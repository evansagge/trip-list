import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { userSignOut } from 'redux/auth/actions';

const LoginButton = ({ isAuthenticated, user, userSignOut }) => {
  if (isAuthenticated) {
    return (
      <div>
        <Button color='inherit' onClick={userSignOut}>
          <AccountCircleIcon />
          &nbsp;
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

const mapStateToProps = ({ auth: { isAuthenticated, user } }) => ({
  isAuthenticated, user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ 
    userSignOut, 
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
