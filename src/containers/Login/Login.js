import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import LoginForm from '../../components/LoginForm';

const Login = (props) => {
    useEffect(() => {
        if (props.currentUser.uid) {
            props.history.push('/');
        }
    })

    const handleLoginClick = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            props.history.push('/');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <LoginForm
            onLoginClick={handleLoginClick}
        />
    );
}
 
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps)(Login);