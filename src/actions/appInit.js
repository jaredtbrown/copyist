import { setCurrentUser } from './currentUser';
import { setTeam } from './team';
import firebaseWrapper from '../helpers/firebaseWrapper';
import { APP_INIT_REQUEST, APP_INIT_SUCCESS, APP_INIT_FAILURE } from './actionTypes';

const appInitRequest = () => ({
    type: APP_INIT_REQUEST,
});

const appInitSuccess = () => ({
    type: APP_INIT_SUCCESS,
});

const appInitFailure = () => ({
    type: APP_INIT_FAILURE,
});

export const appInitialize = (user) => {
    return async (dispatch) => {
        dispatch(appInitRequest());
        const database = firebaseWrapper.firestore();
        try {
            const userDocument = await database.doc(`users/${user.uid}`).get();
            const userData = userDocument.data();
            dispatch(setCurrentUser({
                uid: user.uid,
                email: user.email,
                ...userData,
            }));

            const teamDocument = await database.doc(`teams/${userData.teamId}`).get();
            const teamData = teamDocument.data();
            dispatch(setTeam(teamData));
            dispatch(appInitSuccess());
        } catch (error) {
            dispatch(appInitFailure());
        }
    }
}