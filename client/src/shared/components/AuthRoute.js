import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = ({ isAuthenticated, type, ...props }) => {
  if (type === "guest" && isAuthenticated) return <Redirect to="/" />;
  else if (type === "private" && !isAuthenticated) return <Redirect to="/sign-in" />;

  return <Route {...props} />;
};

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated
});

export default connect(mapStateToProps)(AuthRoute);;