import Axios from 'axios';

const instance = Axios.create({
    withCredentials: true,
    baseURL: "http://192.168.0.106"
        // baseURL: "http://25.70.163.92/"
});

export const getUsers = (currentPage, usersPageEls, mode, like) => {
    return instance.get(`users.php?page=${currentPage}&num=${usersPageEls}&mode=${mode}&like=${like}`)
        .then(response => response.data);
}

export const authAPI = {
    amLogged: () => instance.get(`amlogged.php`).then(response => response.data),
    login: (username, password) => instance.get(`login.php?u=${username}&p=${password}`).then(response => response.data),
    logout: () => instance.get(`logout.php`).then(response => response.data),
    getName: () => instance.get(`getname.php`).then(response => response.data),
    register: (data) => {
        return instance.post(`register.php`, {...data }).then(response => response.data);
    }
};

export const FUnfAPI = {
    follow: (username) => instance.post(`follow-unfollow/follow-unfollow.php?action=f&user=${username}`).then(response => response.data),
    unfollow: (username) => instance.post(`follow-unfollow/follow-unfollow.php?action=u&user=${username}`).then(response => response.data)
};

export const getProfile = (username) => {
    return instance.get(`profiles.php?username=${!username ? "" : username}`).then(response => response.data);
};

export const setStatus = status => {
    return instance.get(`setstatus.php?status=${status}`).then(response => response.data);
};

export const validatorsAPI = {
    ifUsernameExists: username => instance.post(`validators/usernameExists.php`, { username }).then(response => response.data)
}

export const dialogsAPI = {
    getDialogs: () => instance.get(`messages/getDialogs.php`).then(response => response.data),
    getMessages: (page, pageNum, recipient, pk) => instance.get(`messages/getMessages.php?recipient=${recipient}&page=${page}&num=${pageNum}&pk=${pk}`).then(response => response.data),
    getTotalMessages: (user, pageNum) => instance.get(`messages/getTotalMessagesPages.php?user=${user}&num=${pageNum}`).then(response => response.data),
    sendMessage: (recipient, message) => instance.post(`messages/sendMessage.php`, { recipient, message }).then(response => response.data),
    pingMessages: (recipient) => instance.get(`messages/unreadsNumber.php?r=${recipient}`).then(response => response.data),
    getUnreadMessages: (recipient) => instance.get(`messages/getUnreads.php?r=${recipient}`).then(response => response.data)
}