import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import { clearCurrentUser } from './actions/currentUser';
import Toolbar from './components/Toolbar';
import { appInitialize } from './actions/appInit';

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
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      await props.dispatch(appInitialize(user));
    } else {
      props.dispatch(clearCurrentUser());
    }
  });

  return (
    <BrowserRouter>
      <Toolbar />

      <Switch>
        <Route exact path="/" component={() => <h1>Start</h1>} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(App);
