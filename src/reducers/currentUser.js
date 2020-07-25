import { CLEAR_CURRENT_USER, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_REQUEST, GET_CURRENT_USER_FAILURE } from "../actions/actionTypes";

const initialState = {
    isFetching: false,
    uid: localStorage.getItem('userId'),
    firstName: '',
    lastName: '',
    teamId: '',
};

const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case GET_CURRENT_USER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                ...action.user,
            });
        case GET_CURRENT_USER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case CLEAR_CURRENT_USER:
            return initialState;
        default:
            return state;
    }
}

export default currentUser;
