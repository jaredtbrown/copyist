import { GET_TEAM_REQUEST, GET_TEAM_SUCCESS, GET_TEAM_FAILURE } from "../actions/actionTypes";

const initialState = {
    isFetching: false,
    name: '',
};

const team = (state = initialState, action) => {
    switch(action.type) {
        case GET_TEAM_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case GET_TEAM_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                ...action.team,
            });
        case GET_TEAM_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            });
        default:
            return state;
    }
}

export default team;
