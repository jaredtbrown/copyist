import { setCurrentUser } from './currentUser';
import { setTeam } from './team';
import firebaseWrapper from '../helpers/firebaseWrapper';

export const appInitialize = (user) => {
    return async (dispatch) => {
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
        } catch (error) {
            console.log('error');
        }
    }
}