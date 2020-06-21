import { getProfile, setStatus } from "../../api/api";

const ADD_POST = "ADD-POST",
    NEW_POST_TEXT_CHANGE = "NEW-POST-TEXT-CHANGE",
    SET_PROFILE = "SET-PROFILE",
    SET_STATUS = "SET-STATUS",
    TOGGLE_FOLLOW = "TOGGLE-FOLLOW";

let initialState = {
    posts: [
        { message: "Hello, it's my first Post!", likesCount: "5", avaSrc: "https://assets.website-files.com/5d9ba0eb5f6edb77992a99d0/5e6f353a0f8bc38b8bbcc052_iconfinder_29-Doctor_5929215.png", id: "1" },
        { message: "Hi, nice application btw :)", likesCount: "41", avaSrc: "https://cdn2.iconfinder.com/data/icons/popular-games-1/50/minecraft_squircle-512.png", id: "2" },
        { message: "Awesome result!", likesCount: "0", avaSrc: "https://cdn2.iconfinder.com/data/icons/character-avatar/64/05-people-avatar-512.png", id: "3" },
        { message: "Nice one!", likesCount: "69", avaSrc: "https://assets.website-files.com/5d9ba0eb5f6edb77992a99d0/5e6f353a0f8bc38b8bbcc052_iconfinder_29-Doctor_5929215.png", id: "4" }
    ],
    postForm: {
        newPostText: ""
    },
    profile: {
        followed: false,
        imgSrc: "https://sun9-42.userapi.com/c824201/v824201973/16209c/rzYEIvOFb9I.jpg",
        name: "Artyom Belsky",
        status: "Just developin' this app",
        country: "Belarus",
        city: "Minsk",
        dob: "October 17",
        edu: "Gymnasium №36",
        website: "http://vk.com/arbelsky"
    }
};

const profilePageReducer = (state = initialState, action) => {

    if (action.type == ADD_POST) {
        let stateCopy = {...state };
        let newPost = {
            message: state.postForm.newPostText,
            likesCount: "0",
            avaSrc: "https://cdn3.iconfinder.com/data/icons/education-209/64/apple-fruit-science-school-512.png",
            id: "5"
        };
        stateCopy.posts = [...state.posts];
        stateCopy.postForm = {...state.postForm };

        stateCopy.posts.push(newPost);
        stateCopy.postForm.newPostText = "";

        return stateCopy;
    } else if (action.type == NEW_POST_TEXT_CHANGE) {

        let stateCopy = {...state };
        stateCopy.postForm = {...state.postForm }

        stateCopy.postForm.newPostText = action.text;
        return stateCopy;
    } else if (action.type == SET_PROFILE) {
        return {
            ...state,
            profile: {...action.profile }
        }
    } else if (action.type == SET_STATUS) {
        return {
            ...state,
            profile: {...state.profile, status: action.status }
        }
    } else if (action.type == TOGGLE_FOLLOW) {
        return {
            ...state,
            profile: {...state.profile, followed: !state.profile.followed }
        }
    }

    return state;
}

export const addPostActionCreator = () => ({ type: ADD_POST });
export const newPostTextChangeActionCreator = text => ({ type: NEW_POST_TEXT_CHANGE, text: text });
export const setProfileAC = profile => ({ type: SET_PROFILE, profile });
export const setStatusAC = status => ({ type: SET_STATUS, status });
export const toggleFollowAC = () => ({ type: TOGGLE_FOLLOW });

export const getUserThunkCretor = (username) => {
    return dispatch => {
        getProfile(username).then(response => {
            dispatch(setProfileAC(response.data));
        });
    }
}

export const setStatusTC = status => {
    return dispatch => {
        setStatus(status).then(response => {
            dispatch(setStatusAC(response.status));
        })
    }
}

export default profilePageReducer;