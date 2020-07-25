import { GET_TEAM_REQUEST, GET_TEAM_SUCCESS, GET_TEAM_FAILURE } from "./actionTypes";
import firebaseWrapper from "../helpers/firebaseWrapper";

const getTeamRequest = () => ({
    type: GET_TEAM_REQUEST,
});

const getTeamSuccess = (team) => ({
    type: GET_TEAM_SUCCESS,
    team,
});

const getTeamFailure = (error) => ({
    type: GET_TEAM_FAILURE,
    error,
});

export const getTeam = (teamId) => {
    return async (dispatch) => {
        dispatch(getTeamRequest());
        try {
            const database = firebaseWrapper.firestore();
            const teamDocument = await database.doc(`teams/${teamId}`).get();
            return dispatch(getTeamSuccess({
                id: teamDocument.id,
                ...teamDocument.data()
            }));
        } catch (error) {
            return dispatch(getTeamFailure())
        }
    }
};