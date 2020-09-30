import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Trips } from 'pages/Trips';
import { Users } from 'pages/Users';
import { SignUp } from 'pages/SignUp';
import { SignIn } from 'pages/SignIn';
import { PageNotFound } from 'pages/PageNotFound';
import Navigation from 'shared/components/Navigation';
import AuthRoute from 'shared/components/AuthRoute';

import { userSignInFromToken } from 'redux/auth/actions';

const styles = {
  appContent: {
    'margin-top': 15
  }
};

class App extends React.Component {
  componentDidMount() {
    const accessToken = localStorage.getItem('access-token');

    if (!this.props.isAuthenticated && accessToken) {
      this.props.userSignInFromToken(accessToken)
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <Navigation />

        <Container className={classes.appContent} maxWidth={false}>
          <Switch>
            <AuthRoute exact path="/" type="private">
              <Trips />
            </AuthRoute>
            <AuthRoute exact path="/users" type="private">
              <Users />
            </AuthRoute>
            <AuthRoute exact path="/sign-up" type="guest">
              <SignUp />
            </AuthRoute>
            <AuthRoute exact path="/sign-in" type="guest">
              <SignIn />
            </AuthRoute>
            <Route component={PageNotFound} />
          </Switch>
        </Container>
      </Router>
     )
  }
}

const mapStateToProps = ({ auth: { isAuthenticated, user } }) => ({
  isAuthenticated, user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ 
    userSignInFromToken, 
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
