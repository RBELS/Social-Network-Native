import { dialogsAPI } from "../../api/api";

const ADD_MESSAGE = "SEND-MESSAGE",
    MESSAGE_TEXT_CHANGE = "MESSAGE-TEXT-CHANGE",
    SET_DIALOGS = "SET-DIALOGS",
    SET_MESSAGES = "SET-MESSAGES",
    APPEND_MESSAGES = "APPEND-DIALOGS",
    SET_TOTAL_PAGES = "SET-TOTAL-PAGES",
    SET_FETCHING = "SET-FETCHING",
    IF_FIRST_MESSAGE = "IF_FIRST_MESSAGE",
    SET_UNREAD_TO_READ = "SET_UNREAD_TO_READ",
    PUSH_MESSAGES = "PUSH_MESSAGES",
    PING_DIALOGS = "PING_DIALOGS";

let initialState = {
    dialogs: [],
    right: {
        messages: [],
        totalPages: undefined,
        isFetching: false,
        newMessageText: "",
        lastPK: undefined
    }
};


const dialogsPageReducer = (state = initialState, action) => {

    if (action.type == ADD_MESSAGE) {
        return {
            ...state,
            right: {
                ...state.right,
                messages: [action.message, ...state.right.messages]
            }
        }
    } else if (action.type == MESSAGE_TEXT_CHANGE) {
        return {
            ...state,
            right: {
                ...state.right,
                newMessageText: action.newText
            }
        }
    } else if (action.type == SET_DIALOGS) {
        return {
            ...state,
            dialogs: action.dialogs
        }
    } else if (action.type == SET_MESSAGES) {
        return {
            ...state,
            right: {
                ...state.right,
                lastPK: action.messages[0] == undefined ? 10000000 : action.messages[0].pk,
                messages: action.messages,
            }
        }
    } else if (action.type == APPEND_MESSAGES) {
        return {
            ...state,
            right: {
                ...state.right,
                messages: [...state.right.messages, ...action.messages]
            }
        }
    } else if (action.type == SET_TOTAL_PAGES) {
        return {
            ...state,
            right: {
                ...state.right,
                totalPages: action.total
            }
        }
    } else if (action.type == SET_FETCHING) {
        return {
            ...state,
            right: {
                ...state.right,
                isFetching: action.isFetching
            }
        }
    } else if (action.type == IF_FIRST_MESSAGE) {
        if (state.right.messages.length == 1) {
            return {
                ...state,
                dialogs: [...state.dialogs, { pk: state.right.messages[0].pk, written: state.right.messages[0].recipient, name: state.right.messages[0].rName }]
            }
        }
    } else if (action.type == SET_UNREAD_TO_READ) {
        return {
            ...state,
            dialogs: state.dialogs.map(d => {
                if (d.written == action.recipient) {
                    d.unread = 0;
                }
                return d;
            })
        }
    } else if (action.type == PUSH_MESSAGES) {
        return {
            ...state,
            right: {
                ...state.right,
                messages: [...action.messages, ...state.right.messages]
            }
        }
    } else if (action.type == PING_DIALOGS) {
        return {
            ...state,
            dialogs: state.dialogs.map(d => {
                if (action.senders.includes(d.written)) {
                    console.log(d.written);
                    return {
                        ...d,
                        unread: 1,
                        last: action.msgs[action.senders.indexOf(d.written)]
                    }
                }
                return d;
            })
        }
    }

    return state;
}


export const addMessageAC = (message) => ({ type: ADD_MESSAGE, message });
export const onNewMessageTextChangeActionCreator = newText => ({ type: MESSAGE_TEXT_CHANGE, newText: newText });
export const setDialogsAC = dialogs => ({ type: SET_DIALOGS, dialogs });
export const setMessagesAC = messages => ({ type: SET_MESSAGES, messages });
export const appendMessagesAC = messages => ({ type: APPEND_MESSAGES, messages });
export const setTotalPagesAC = total => ({ type: SET_TOTAL_PAGES, total });
export const setFetchingAC = isFetching => ({ type: SET_FETCHING, isFetching });
export const appendDialogsIfNeededAC = () => ({ type: IF_FIRST_MESSAGE });
export const setUnreadToReadAC = recipient => ({ type: SET_UNREAD_TO_READ, recipient });
export const pushMessagesAC = messages => ({ type: PUSH_MESSAGES, messages });
export const pingDialogsAC = (senders, msgs) => ({ type: PING_DIALOGS, senders, msgs });

export const getDialogsTC = () => dispatch => {
    dialogsAPI.getDialogs().then(response => {
        dispatch(setDialogsAC(response));
    })
}

export const setMessagesTC = (page, pageNum, recipient) => dispatch => {
    dispatch(setFetchingAC(true));
    dialogsAPI.getMessages(page, pageNum, recipient).then(response => {
        dispatch(setMessagesAC(response));
        dispatch(setFetchingAC(false));
        dispatch(setUnreadToReadAC(recipient));
    });

    dialogsAPI.getTotalMessages(recipient, pageNum).then(response => {
        dispatch(setTotalPagesAC(response));
    });
}

export const appendMessagesTC = (page, pageNum, recipient, pk) => dispatch => {
    dispatch(setFetchingAC(true));
    dialogsAPI.getMessages(page, pageNum, recipient, pk).then(response => {
        dispatch(appendMessagesAC(response));
        dispatch(setFetchingAC(false));
    });
}

export const sendMessageTC = (recipient, message) => dispatch => {
    // console.log(recipient + " " + message);
    dialogsAPI.sendMessage(recipient, message).then(response => {
        if (!response.success) {
            alert("Error!");
        } else {
            dispatch(addMessageAC(response.message));
            dispatch(appendDialogsIfNeededAC());
            dispatch(getDialogsTC());
        }
        dispatch(onNewMessageTextChangeActionCreator(""));
    });
}

export const pingMessagesTC = recipient => dispatch => {
    dialogsAPI.pingMessages(recipient).then(response => {
        if (response != 0) {
            console.log("New messages!");
            dialogsAPI.getUnreadMessages(recipient).then(response => {
                dispatch(pushMessagesAC(response));
            });
        }
    });
}

export const pingDialogsTC = () => async dispatch => {
    let response = await dialogsAPI.pingDialogsNative();

    if (response.have) {
        dispatch(pingDialogsAC(response.senders, response.lasts));
    }
}


export default dialogsPageReducer;