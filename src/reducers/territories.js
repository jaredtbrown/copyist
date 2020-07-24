import { SET_TERRITORIES } from "../actions/actionTypes";

const initialState = [];

const territories = (state = initialState, action) => {
    switch (action.type) {
        case SET_TERRITORIES:
            return [...action.territories];
        default:
            return state;
    }
}

export default territories;
