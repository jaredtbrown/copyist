import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import SignUpForm from '../../components/SignUpForm';

const SignUp = (props) => {
    useEffect(() => {
        if (props.currentUser.uid) {
            props.history.push('/');
        }
    })

    const handleSignUp = async (signUpData) => {
        try {
            const credentials = await firebase.auth().createUserWithEmailAndPassword(signUpData.email, signUpData.password);
            const db = firebase.firestore();

            const newTeam = await db.collection('teams').add({
                name: signUpData.teamName,
                createdAt: firebase.firestore.Timestamp.now(),
            });

            const newUser = credentials.user;
            db.collection('users').doc(newUser.uid).set({
                firstName: signUpData.firstName,
                lastName: signUpData.lastName,
                createdAt: firebase.firestore.Timestamp.now(),
                teamId: newTeam.id
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SignUpForm
            onSignUpClick={handleSignUp}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    }
}
 
export default connect(mapStateToProps)(SignUp);