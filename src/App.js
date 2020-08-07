import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import { clearCurrentUser } from './actions/currentUser';
import Toolbar from './containers/Toolbar';
import { appInitialize } from './actions/appInit';
import ProtectedRoute from './containers/ProtectedRoute';
import Territories from './containers/Territories';
import firebaseWrapper from './helpers/firebaseWrapper';
import Territory from './containers/Territory';

firebaseWrapper.initializeApp();

function App(props) {
  useEffect(() => {
    firebaseWrapper.auth().onAuthStateChanged(async (user) => {
      if (user) {
          await props.dispatch(appInitialize(user));
      } else {
        props.dispatch(clearCurrentUser());
      }
    });
  })

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#3e588c"
      },
      secondary: {
        main: "#4f9c72"
      },
      error: {
        main: '#D93829'
      },
    },
    shape: {
      borderRadius: 0
    },
  });

  return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter >
          <Toolbar />

          <Switch>
            <ProtectedRoute exact path="/" component={() => <Redirect to="/territories" />} />
            <ProtectedRoute exact path="/territories" component={Territories} />
            <ProtectedRoute exact path="/territories/:territoryId" component={Territory} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
  );
}

export default connect(null)(App);
