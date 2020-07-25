import { getCurrentUser } from './currentUser';
import { getTeam } from './team';
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
        let getUserResult;
        try {
            getUserResult = await dispatch(getCurrentUser(user));
        } catch (error) {
            dispatch(appInitFailure());
        }

        try {
            await dispatch(getTeam(getUserResult.user.teamId))
        } catch (error) {
            dispatch(appInitFailure());
        }

        dispatch(appInitSuccess());
    }
}