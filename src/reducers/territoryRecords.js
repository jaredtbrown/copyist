import { GET_TERRITORY_RECORDS_REQUEST, GET_TERRITORY_RECORDS_SUCCESS, GET_TERRITORY_RECORDS_FAILURE } from "../actions/actionTypes";

const initialState = {
    isFetching: false,
    territoryRecords: {},
};

const territoryRecords = (state = initialState, action) => {
    switch (action.type) {
        case GET_TERRITORY_RECORDS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case GET_TERRITORY_RECORDS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                territoryRecords: {
                    [action.territoryId]: action.records,
                },
            });
        case GET_TERRITORY_RECORDS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
            });
        default:
            return state;
    }
}

export default territoryRecords;
