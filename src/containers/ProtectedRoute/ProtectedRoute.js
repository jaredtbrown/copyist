import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRouted = (props) => {
    if (!props.currentUser.uid) {
        return (
            <Redirect to="/login" />
        )
    }

    return (
        <Route component={props.component} exact={props.exact} path={props.path} />
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    }
};
 
export default connect(mapStateToProps)(ProtectedRouted);