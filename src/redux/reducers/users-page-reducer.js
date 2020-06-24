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
    SET_PAGE = "SET-PAGE",
    APPEND_USERS = "APPEND_USERS",
    GET_FRIENDS = "GET_FRIENDS",
    APPEND_FRIENDS = "APPEND_FRIENDS";

let initialState = {
    users: [],
    followers: [],
    follows: [],
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
            users: [
                ...action.newUsers
            ]
        };
    } else if (action.type == APPEND_USERS) {
        return {
            ...state,
            users: [
                ...state.users,
                ...action.users
            ]
        }
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
    } else if (action.type == GET_FRIENDS) {
        if (action.mode === 1) {
            return {
                ...state,
                followers: [...action.friends]
            }
        } else {
            return {
                ...state,
                follows: [...action.friends]
            }
        }
    } else if (action.type == APPEND_FRIENDS) {
        if (action.mode === 1) {
            return {
                ...state,
                followers: [...state.followers, ...action.friends]
            }
        } else {
            return {
                ...state,
                follows: [...state.follows, ...action.friends]
            }
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
export const appendUsersAC = users => ({ type: APPEND_USERS, users });
export const getFriendsAC = (friends, mode) => ({ type: GET_FRIENDS, friends, mode }); //1 - followers, 2 - followed
export const appendFriendsAC = (friends, mode) => ({ type: APPEND_FRIENDS, friends, mode });

export const followersTC = (page, number, like, append) => dispatch => {
    dispatch(toggleFetchingAC());
    getUsers(page, number, 3, like).then(followers => {
        if (append) {
            dispatch(appendFriendsAC(followers, 1));
        } else {
            dispatch(getFriendsAC(followers, 1));
        }
        dispatch(toggleFetchingAC());
    });
}

export const followsTC = (page, number, like, append) => dispatch => {
    dispatch(toggleFetchingAC());
    getUsers(page, number, 2, like).then(follows => {
        if (append) {
            dispatch(appendFriendsAC(follows, 2));
        } else {
            dispatch(getFriendsAC(follows, 2));
        }
        dispatch(toggleFetchingAC());
    });
}

export const getUsersTC = (currentPage, usersPageEls, mode, like) => {
    return dispatch => {
        dispatch(toggleFetchingAC());
        getUsers(currentPage, usersPageEls, mode, like).then(response => {
            dispatch(getUsersAC(response));
            dispatch(toggleFetchingAC());
        });
    }
}

export const appendUsersTC = (page, usersPageEls, mode, like) => {
    return dispatch => {
        dispatch(toggleFetchingAC());
        getUsers(page, usersPageEls, mode, like).then(response => {
            dispatch(appendUsersAC(response));
            dispatch(toggleFetchingAC());
        });
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