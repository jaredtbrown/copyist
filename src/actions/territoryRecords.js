import firebaseWrapper from "../helpers/firebaseWrapper";
import { GET_TERRITORY_RECORDS_REQUEST, GET_TERRITORY_RECORDS_SUCCESS, GET_TERRITORY_RECORDS_FAILURE, CREATE_TERRITORY_RECORD_REQUEST, CREATE_TERRITORY_RECORD_FAILURE } from "./actionTypes";

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

const createTerritoryRecordRequest = () => ({
    type: CREATE_TERRITORY_RECORD_REQUEST,
});

const createTerritoryRecordSuccess = (record) => ({
    type: CREATE_TERRITORY_RECORD_REQUEST,
    record,
});

const createTerritoryRecordFailure = () => ({
    type: CREATE_TERRITORY_RECORD_FAILURE,
});

export const createTerritoryRecord = (record) => {
    return async (dispatch) => {
        dispatch(createTerritoryRecordRequest());
        try {
            const database = firebaseWrapper.firestore();
            await database.collection('records').add({
                firstName: record.firstName,
                lastName: record.lastName,
                createdAt: firebaseWrapper.timestamp.now(),
                territoryId: record.territoryId,
                teamId: record.teamId,
                streetAddress1: record.streetAddress1,
                streetAddress2: record.streetAddress2,
                city: record.city,
                region: record.region,
                postcode: record.postcode,
                phone: record.postcode,
            });
            return dispatch(createTerritoryRecordSuccess(record));
        } catch (error) {
            console.log(error);
            return dispatch(createTerritoryRecordFailure(error));
        }
    }
};