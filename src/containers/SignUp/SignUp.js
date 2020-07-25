import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SignUpForm from '../../components/SignUpForm';
import firebaseWrapper from '../../helpers/firebaseWrapper';

const SignUp = (props) => {
    useEffect(() => {
        if (props.currentUser.uid) {
            props.history.push('/');
        }
    })

    const handleSignUp = async (signUpData) => {
        try {
            const credentials = await firebaseWrapper.auth().createUserWithEmailAndPassword(signUpData.email, signUpData.password);
            const db = firebaseWrapper.firestore();

            const newTeam = await db.collection('teams').add({
                name: signUpData.teamName,
                createdAt: firebaseWrapper.firestore.Timestamp.now(),
            });

            const newUser = credentials.user;
            db.collection('users').doc(newUser.uid).set({
                firstName: signUpData.firstName,
                lastName: signUpData.lastName,
                createdAt: firebaseWrapper.firestore.Timestamp.now(),
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