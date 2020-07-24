import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import { clearCurrentUser } from './actions/currentUser';
import Toolbar from './containers/Toolbar';
import { appInitialize } from './actions/appInit';
import ProtectedRoute from './containers/ProtectedRoute';
import Territories from './containers/Territories';

const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENTID}`
}
firebase.initializeApp(config);
firebase.analytics();

function App(props) {
  const { dispatch } = props;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await dispatch(appInitialize(user));
      } else {
        dispatch(clearCurrentUser());
      }
    });
  }, [dispatch]);

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
            <ProtectedRoute exact path="/" component={Territories} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(App);
