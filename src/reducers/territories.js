import { GET_TERRITORIES_REQUEST, GET_TERRITORIES_SUCCESS, GET_TERRITORIES_FAILURE } from "../actions/actionTypes";

const initialState = {
    isFetching: false,
    territories: [],
};

const territories = (state = initialState, action) => {
    switch (action.type) {
        case GET_TERRITORIES_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case GET_TERRITORIES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                territories: action.territories,
            });
        case GET_TERRITORIES_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            });
        default:
            return state;
    }
}

export default territories;
