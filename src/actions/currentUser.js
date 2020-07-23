import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "./actionTypes";

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user,
    }
};

export const clearCurrentUser = () => ({
    type: CLEAR_CURRENT_USER
})
