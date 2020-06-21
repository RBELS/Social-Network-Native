import { createStore, combineReducers, applyMiddleware } from "redux";
import profilePageReducer from "./reducers/profile-page-reducer";
import dialogsPageReducer from "./reducers/dialogs-page-reducer";
import navBarReducer from "./reducers/nav-bar-reducer";
import usersPageReducer from "./reducers/users-page-reducer";
import authReducer from "./reducers/auth-reducer";
import thunkMW from "redux-thunk";
import appReducer from "./reducers/app-reducer";



let reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    navBar: navBarReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMW));

// window.store = store;


export default store;