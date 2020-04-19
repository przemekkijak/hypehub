
import { setCurrentItems, setSoldItems, setUserData } from "../constants/action-types";

const initialState = {
    user: {
        isLoged: false,
        uid: 0,
    },
    currentItems: [],
    soldItems: [],
}

function rootReducer(state = initialState, action) {

    if(action.type === setUserData) {
        state.user = action.payload;
    }

    if(action.type === setCurrentItems) {
        state.currentItems = action.payload;
    }
    if(action.type === setSoldItems) {
        state.soldItems = action.payload;
    }
    return state;
}

export default rootReducer;