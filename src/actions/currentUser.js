import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "./actionTypes";

export const setCurrentUser = (user) => {
    localStorage.setItem('userId', user.uid);

    return {
        type: SET_CURRENT_USER,
        user,
    }
};

export const clearCurrentUser = () => {
    localStorage.clear();

    return {
        type: CLEAR_CURRENT_USER
    }
}
