import React, { Component, Suspense } from "react";
import PropTypes from "prop-types";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { dispatchCheckSession } from "../actions/login";

// import LoginPage from './login';
// import Main from './main';
import Loading from "./loading";
const LoginPage = React.lazy(() => import("./login"));
const Main = React.lazy(() => import("./main"));

const propTypes = {
  isLogin: PropTypes.string.isRequired,
  checkSession: PropTypes.func.isRequired
};

const defaultProps = {};

class App extends Component {
  componentDidMount() {
    this.props.checkSession();
  }

  render() {
    const { isLogin } = this.props;
    if (isLogin === "pending") {
      return <Loading loadingFor="checking session to login..." />;
    }
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
              </Suspense>
            )}
          />
          <Route
            path="/main"
            component={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Main />
              </Suspense>
            )}
          />
        </Switch>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapStateToProps = state => ({
  isLogin: state.login.isLogin
});

const mapDispatchToProps = {
  checkSession: dispatchCheckSession
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
