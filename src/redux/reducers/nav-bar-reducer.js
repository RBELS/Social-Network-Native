import { dialogsAPI } from "../../api/api";

const SET_HAVE_UNREADS = "SET_HAVE_UNREADS";

let initialState = {
    haveUnreads: false
};

const navBarReducer = (state = initialState, action) => {

    if (action.type == SET_HAVE_UNREADS) {
        return {
            haveUnreads: action.set
        }
    }
    return state;
}

export const setHaveUnreadsAC = set => ({ type: SET_HAVE_UNREADS, set });

export const checkIfHaveUnreadsTC = past => async dispatch => {
    let have = await dialogsAPI.haveUnreads();
    dispatch(setHaveUnreadsAC(have));
}



export default navBarReducer;