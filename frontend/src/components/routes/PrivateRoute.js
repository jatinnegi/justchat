import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => {
  if (!isAuthenticated) return <Redirect to="/" />;
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
