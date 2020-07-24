import { SET_TERRITORIES } from "./actionTypes"

export const setTerritories = (territories) => {
    return {
        type: SET_TERRITORIES,
        territories,
    }
}