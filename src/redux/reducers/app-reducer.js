import { authAPI } from "../../api/api";
import { stopSubmit } from "redux-form";
import { amLoggedTC } from "./auth-reducer";

const INIT = "INIT";

let initialState = {
    init: false
};

const appReducer = (state = initialState, action) => {
    if (action.type == INIT) {
        return {
            ...state,
            init: true
        };
    }

    return state;
}

export const initAC = () => ({ type: INIT });

export const initAppTC = logged => dispatch => {

    let promise = dispatch(amLoggedTC(logged));


    promise.then(() => {
        dispatch(initAC());
    });
    // Promise.all([promise, getNameP]).then(() => {
    //     dispatch(initAC());
    // });
}






export default appReducer;