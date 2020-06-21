import { getUsers, FUnfAPI } from "../../api/api";
import { toggleFollowAC } from "./profile-page-reducer";

const TOGGLE_FOLLOW = "TOGGLE-FOLLOW",
    GET_USERS = "GET-USERS",
    DELETE_USERS = "DELETE-USERS",
    TOGGLE_FETCHING = "TOGGLE-FETCHING",
    FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    ADD_TO_BLOCED = "ADD-TO-BLOCKED",
    DELETE_FROM_BLOCKED = "DELETE-FROM-BLOCKED",
    SET_PAGE = "SET-PAGE";

let initialState = {
    users: [],
    // usersPageEls: 5,
    // currentPage: 1,
    isFetching: false,
    followsToBlock: [],
    first: false
};


const usersPageReducer = (state = initialState, action) => {

    if (action.type == GET_USERS) {
        return {
            ...state,
            currentPage: action.newUsers[0] == undefined ? state.currentPage : state.currentPage + 1,
            users: [
                ...state.users,
                ...action.newUsers
            ]
        };
    } else if (action.type == DELETE_USERS) {
        return {
            ...state,
            users: [],
            usersPageEls: 2,
            currentPage: 1,
            isFetching: false,
            followsToBlock: [],
            first: false
        }
    } else if (action.type == TOGGLE_FETCHING) {
        return {
            ...state,
            isFetching: state.isFetching ? false : true
        }
    } else if (action.type == FOLLOW) {
        return {
            ...state,
            users: state.users.map(u => {
                if (u.username == action.username) {
                    return {...u, followed: true };
                }
                return u;
            })
        };
    } else if (action.type == UNFOLLOW) {
        return {
            ...state,
            users: state.users.map(u => {
                if (u.username == action.username) {
                    return {...u, followed: false };
                }
                return u;
            })
        };
    } else if (action.type == ADD_TO_BLOCED) {
        return {
            ...state,
            followsToBlock: [...state.followsToBlock, action.username]
        };
    } else if (action.type == DELETE_FROM_BLOCKED) {
        return {
            ...state,
            followsToBlock: state.followsToBlock.map(u => u == action.username ? null : u)
        };
    } else if (action.type == SET_PAGE) {
        return {
            ...state,
            currentPage: action.page
        }
    }
    return state;

}



export const toggleFollowCreator = username => ({ type: TOGGLE_FOLLOW, username });
export const getUsersAC = newUsers => ({ type: GET_USERS, newUsers: newUsers });
export const deleteUsersAC = () => ({ type: DELETE_USERS });
export const toggleFetchingAC = () => ({ type: TOGGLE_FETCHING });
export const followAC = username => ({ type: FOLLOW, username });
export const unfollowAC = username => ({ type: UNFOLLOW, username });
export const addToBlockedAC = username => ({ type: ADD_TO_BLOCED, username });
export const deleteFromBlockedAC = username => ({ type: DELETE_FROM_BLOCKED, username });
export const setPageAC = (page) => ({ type: SET_PAGE, page });

export const getUsersTC = (currentPage, usersPageEls, mode) => {
    return dispatch => {
        getUsers(currentPage, usersPageEls, mode).then(response => {
            dispatch(getUsersAC(response));
            dispatch(toggleFetchingAC());
        });
        dispatch(toggleFetchingAC());
    }
}

export const followTC = username => {
    return dispatch => {
        dispatch(addToBlockedAC(username));
        FUnfAPI.follow(username).then(response => {
            if (response.success) {
                dispatch(followAC(username));
            }
            dispatch(deleteFromBlockedAC(username));
            dispatch(toggleFollowAC());
        });
    }
}

export const unfollowTC = username => {
    return dispatch => {
        dispatch(addToBlockedAC(username));
        FUnfAPI.unfollow(username).then(response => {
            if (response.success) {
                dispatch(unfollowAC(username));
            }
            dispatch(deleteFromBlockedAC(username));
            dispatch(toggleFollowAC());
        });
    }
}

export default usersPageReducer;