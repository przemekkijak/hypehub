import { setCurrentItems, setSoldItems, setUserData } from "../constants/action-types";


export function setCurrent(payload) {
    return { type: setCurrentItems, payload}
};

export function setSold(payload) {
    return { type: setSoldItems, payload}
};

export function setUser(payload) {
    return { type: setUserData, payload}
};