import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "../actions/actionTypes";

const initialState = {
    uid: localStorage.getItem('userId'),
    firstName: '',
    lastName: '',
    teamId: '',
};

const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return Object.assign({}, state, {
                ...action.user,
            });
        case CLEAR_CURRENT_USER:
            return initialState;
        default:
            return state;
    }
}

export default currentUser;
