import { SET_TEAM } from "../actions/actionTypes";

const initialState = {
    name: '',
};

const team = (state = initialState, action) => {
    switch(action.type) {
        case SET_TEAM:
            return Object.assign({}, state, {
                ...action.team,
            });
        default:
            return state;
    }
}

export default team;
