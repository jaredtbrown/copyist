import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import firebaseWrapper from '../../helpers/firebaseWrapper';

const Login = (props) => {
    useEffect(() => {
        if (props.currentUser.uid) {
            props.history.push('/');
        }
    })

    const handleLoginClick = async (email, password) => {
        try {
            await firebaseWrapper.auth().signInWithEmailAndPassword(email, password);
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