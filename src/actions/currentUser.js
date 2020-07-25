import { CLEAR_CURRENT_USER, GET_CURRENT_USER_REQUEST, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_FAILURE } from "./actionTypes";
import firebaseWrapper from "../helpers/firebaseWrapper";

const getCurrentUserRequest = () => ({
    type: GET_CURRENT_USER_REQUEST,
});

const getCurrentUserSuccess = (user) => ({
    type: GET_CURRENT_USER_SUCCESS,
    user
});

const getCurrentUserFailure = (error) => ({
    type: GET_CURRENT_USER_FAILURE,
    error,
});

export const getCurrentUser = (authedUser) => {
    return async (dispatch) => {
        dispatch(getCurrentUserRequest());
        try {
            const database = firebaseWrapper.firestore();
            const userDocument = await database.doc(`users/${authedUser.uid}`).get();
            const userData = userDocument.data();
            return dispatch(getCurrentUserSuccess({
                uid: authedUser.uid,
                email: authedUser.email,
                ...userData,
            }));
        } catch (error) {
            return dispatch(getCurrentUserFailure(error))
        }
    }
};

export const clearCurrentUser = () => {
    localStorage.clear();

    return {
        type: CLEAR_CURRENT_USER
    }
}
