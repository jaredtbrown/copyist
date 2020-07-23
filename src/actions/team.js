import { SET_TEAM } from "./actionTypes";

export const setTeam = (team) => {
    return {
        type: SET_TEAM,
        team,
    }
};