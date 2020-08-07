import firebaseWrapper from "../helpers/firebaseWrapper";
import { GET_TERRITORY_RECORDS_REQUEST, GET_TERRITORY_RECORDS_SUCCESS, GET_TERRITORY_RECORDS_FAILURE } from "./actionTypes";

const getTerritoryRecordsRequest = () => ({
    type: GET_TERRITORY_RECORDS_REQUEST,
});

const getTerritoryRecordsSuccess = (territoryId, records) => ({
    type: GET_TERRITORY_RECORDS_SUCCESS,
    records,
    territoryId,
});

const getTerritoryRecordsFailure = (error) => ({
    type: GET_TERRITORY_RECORDS_FAILURE,
    error,
});

export const getTerritoryRecords = (territoryId) => {
    return (dispatch) => {
        try {
            const database = firebaseWrapper.firestore();
            database.collection('records')
                .where('territoryId', '==', territoryId)
                .onSnapshot(snapShot => {
                    dispatch(getTerritoryRecordsRequest());
                    const records = [];
                    snapShot.forEach(document => {
                        const record = {
                            id: document.id,
                            ...document.data(),
                        }
                        records.push(record);
                    });
                    return dispatch(getTerritoryRecordsSuccess(territoryId, records));
                });
        } catch (error) {
            return dispatch(getTerritoryRecordsFailure(error))
        }
    }
}