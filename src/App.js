import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import { makeStyles } from '@material-ui/core/styles';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import { clearCurrentUser } from './actions/currentUser';
import Toolbar from './containers/Toolbar';
import { appInitialize } from './actions/appInit';
import ProtectedRoute from './containers/ProtectedRoute';

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

const useStyles = makeStyles((theme) => ({
  root: {
      paddingTop: theme.mixins.toolbar.minHeight,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
  },
}));

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
  }, [dispatch])

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BrowserRouter >
        <Toolbar />

        <Switch>
          <ProtectedRoute exact path="/" component={() => <h1>Start</h1>} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(App);
