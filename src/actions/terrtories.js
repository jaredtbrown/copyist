import { SET_TERRITORIES, GET_TERRITORIES_REQUEST, GET_TERRITORIES_SUCCESS, GET_TERRITORIES_FAILURE } from "./actionTypes"
import firebaseWrapper from "../helpers/firebaseWrapper";

const getTerritoriesRequest = () => ({
    type: GET_TERRITORIES_REQUEST,
});

const getTerritoriesSuccess = (territories) => ({
    type: GET_TERRITORIES_SUCCESS,
    territories,
});

const getTerritoriesFailure = () => ({
    type: GET_TERRITORIES_FAILURE,
});

export const getTerrritories = (teamId) => {
    return async (dispatch) => {
        try {
            const database = firebaseWrapper.firestore();
            database.collection('territories')
                .where('teamId', '==', teamId)
                .onSnapshot(snapShot => {
                    dispatch(getTerritoriesRequest());
                    const territories = [];
                    snapShot.forEach(document => {
                        const territory = {
                            id: document.id,
                            ...document.data(),
                        }
                        territories.push(territory);
                    });
                    return dispatch(getTerritoriesSuccess(territories));
                });
        } catch (error) {
            return dispatch(getTerritoriesFailure(error));
        }
    }
}