import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
    databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECTID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
    measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENTID}`
};

const firebaseWrapper = {
    initializeApp: () => {
        firebase.initializeApp(config);
        firebase.analytics();
    },
    auth: () => firebase.auth(),
    firestore: () => firebase.firestore(),
}

export default firebaseWrapper;
  