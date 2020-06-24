import { authAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const TOGGLE_LOGIN = "TOGGLE-LOGIN",
    ON_U_TEXT_CHANGE = "ON-U-TEXT-CHANGE",
    ON_P_TEXT_CHANGE = "ON-P-TEXT-CHANGE",
    SET_NAME = "SET-NAME";

let initialState = {
    logged: false,
    uText: "",
    pText: "",
    name: "",
    username: undefined
};

const authReducer = (state = initialState, action) => {
    if (action.type == TOGGLE_LOGIN) {
        return {
            ...state,
            logged: action.logged,
            uText: "",
            pText: ""
        };
    } else if (action.type == ON_U_TEXT_CHANGE) {
        return {
            ...state,
            uText: action.newText
        };
    } else if (action.type == ON_P_TEXT_CHANGE) {
        return {
            ...state,
            pText: action.newText
        };
    } else if (action.type == SET_NAME) {
        return {
            ...state,
            name: action.newName,
            username: action.newUsername
        }
    }

    return state;
}


export const toggleLoginAC = (logged) => ({ type: TOGGLE_LOGIN, logged });
export const onUTextChangeAC = (newText) => ({ type: ON_U_TEXT_CHANGE, newText });
export const onPTextChangeAC = (newText) => ({ type: ON_P_TEXT_CHANGE, newText });
export const changeNameAC = (newName, newUsername) => ({ type: SET_NAME, newName, newUsername });

export const amLoggedTC = (logged) => {
    return dispatch => {
        return authAPI.amLogged().then(response => {
            if (!logged && response.logged) {
                dispatch(toggleLoginAC(true));
            } else if (logged && !response.logged) {
                dispatch(toggleLoginAC(false));
            }
        });

    }
}

export const loginTC = (username, password) => {
    return dispatch => {
        authAPI.login(username, password).then(response => {
            if (response.success) {
                dispatch(toggleLoginAC(true));
            } else {
                dispatch(stopSubmit("Login", { _error: "Email or passowrd is wrong!" }));
                dispatch(toggleLoginAC(false));
            }
        });
    };
}

export const logoutTC = () => {
    return dispatch => {
        authAPI.logout().then(response => {
            dispatch(toggleLoginAC(false));
        });
    };
}

export const getNameTC = () => {
    return dispatch => {
        authAPI.getName().then(response => {
            dispatch(changeNameAC(response.name, response.username));
        });
    }
}

export const registerTC = (data) => {
    return dispatch => {
        authAPI.register(data).then(response => {
            if (response) {
                dispatch(toggleLoginAC(true));
            } else {
                dispatch(toggleLoginAC(false));
            }
        });
    }
}

export default authReducer;