import { authAPI } from "../../api/api";

let initialState = {
    users: []
};

const friendsReducer = (state = initialState, action) => {

    return state;
}



export const getNameTC = () => {
    return dispatch => {
        authAPI.getName().then(response => {
            dispatch(changeNameAC(response.name));
        });
    }
}

export default friendsReducer;