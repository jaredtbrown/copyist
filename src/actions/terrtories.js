import { GET_TERRITORIES_REQUEST, GET_TERRITORIES_SUCCESS, GET_TERRITORIES_FAILURE, CREATE_TERRITORY_REQUEST, CREATE_TERRITORY_SUCCESS, CREATE_TERRITORY_FAILURE } from "./actionTypes"
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

const createTerritoryRequest = () => ({
    type: CREATE_TERRITORY_REQUEST,
});

const createTerritorySuccess = (territory) => ({
    type: CREATE_TERRITORY_SUCCESS,
    territory,
});

const createTerritoryFailure = () => ({
    type: CREATE_TERRITORY_FAILURE,
});

export const createTerritory = (territory) => {
    return async (dispatch) => {
        dispatch(createTerritoryRequest());
        try {
            const database = firebaseWrapper.firestore();
            await database.collection('territories').add({
                number: territory.number,
                createdAt: firebaseWrapper.timestamp.now(),
                teamId: territory.teamId,
                externalLink: territory.externalLink,
            });
            return dispatch(createTerritorySuccess());
        } catch (error) {
            return dispatch(createTerritoryFailure(error));
        }
    }
};