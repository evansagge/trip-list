import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Dashboard } from 'pages/Dashboard';
import { Trips } from 'pages/Trips';
import { Users } from 'pages/Users';
import { SignUp } from 'pages/SignUp';
import { SignIn } from 'pages/SignIn';
import Navigation from 'shared/components/Navigation';

const useStyles = makeStyles({
  appContent: {
    'margin-top': 15
  }
});

const App = () => {
  const classes = useStyles();
  const user = null;

  const login = () => {};
  const logout = () => {}

  return (
    <Router>
      <Navigation 
        user={user}
        onLogin={login}
        onLogout={() => logout({ returnTo: window.location.origin })} />

      <Container className={classes.appContent} maxWidth={false}>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/trips">
            <Trips />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <Route exact path="/sign-in">
            <SignIn />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
};

export default App;
