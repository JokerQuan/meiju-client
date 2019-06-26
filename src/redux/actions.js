/**
 * 包含n个action creator
 * 异步action
 * 同步action
 */
import { message } from "antd";

import ajax from "../utils/ajax";
import cookie from "../utils/cookie";
import { 
    RECEIVE_MEIJU_LIST,
    RECEIVE_CATEGORY,
    RECEIVE_MEIJU_COUNT,
    COMMENT_MEIJU_SUCCESS,
    COMMENT_MEIJU_DELETE_SUCCESS,
    RECEIVE_MEIJU_AWESOME_RESULT,
    RECEIVE_MEIJU_REPLAY_RESULT,
    ERROR,
    IS_LOADING,
    RECEIVE_USER_EXIST,
    USER_EXIST_LOADING,
    LOGIN_SUCCESS,
    GET_USER_COOKIE,
    COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
    RECEIVE_COMMENT_LIST,
    RECEIVE_COMMENT_COUNT,
    RECEIVE_AWESOME_RESULT,
    REPLAY_SUCCESS,
    RECEIVE_CLIENT_IP
} from "./action-types";

const receive_meiju_list = (meijuList) => ({type: RECEIVE_MEIJU_LIST, data: meijuList});
const receive_category = (category) => ({type: RECEIVE_CATEGORY, data: category});
const receive_meiju_count = (meijuCount) => ({type: RECEIVE_MEIJU_COUNT, data: meijuCount});

const comment_meiju_success = (meiju) => ({type: COMMENT_MEIJU_SUCCESS, data: meiju});
const comment_meiju_delete_success = (meiju) => ({type: COMMENT_MEIJU_DELETE_SUCCESS, data: meiju});
const receive_meiju_awesome_result = (meiju) => ({type:RECEIVE_MEIJU_AWESOME_RESULT, data: meiju});
const receive_meiju_replay_result = (meiju) => ({type:RECEIVE_MEIJU_REPLAY_RESULT, data: meiju});

const is_loading = (idLoading) => ({type: IS_LOADING, data: idLoading});

const receive_user_exist = (userExist) => ({type: RECEIVE_USER_EXIST, data: userExist});
const user_exist_loading = (userExistLoading) => ({type: USER_EXIST_LOADING, data: userExistLoading});

const login_success = (isLogin) => ({type: LOGIN_SUCCESS, data: isLogin});
const get_user_cookie = (cookieObj) => ({type: GET_USER_COOKIE, data: cookieObj});

const comment_success = (comment) => ({type: COMMENT_SUCCESS, data: comment});
const delete_comment_success = (id) => ({type: DELETE_COMMENT_SUCCESS, data: id});
const receive_comment_list = (commentList) => ({type: RECEIVE_COMMENT_LIST, data: commentList});
const receive_comment_count = (commentCount) => ({type: RECEIVE_COMMENT_COUNT, data: commentCount});
const receive_awesome_result = (changedComment) => ({type: RECEIVE_AWESOME_RESULT, data: changedComment});

const replay_success = (changedComment) => ({type: REPLAY_SUCCESS, data: changedComment});

const receive_client_ip = (ipInfo) => ({type: RECEIVE_CLIENT_IP, data: ipInfo});

const error = (errMsg) => ({type: ERROR, data: errMsg});

export const getMeijuList = (url, params) => {
    return async dispatch => {
        dispatch(is_loading(true));
        const response = await ajax.get(url, params);
        const result = response.data;
        if (result.code === 0) {
            dispatch(receive_meiju_list(result.data));
        } else {
            dispatch(error(result.errMsg));
        }
        dispatch(is_loading(false));
    }
}

export const getCategory = () => {
    return async dispatch => {
        const response = await ajax.get('/api/category');
        const result = response.data;
        if (result.code === 0) {
            dispatch(receive_category(result.data));
        } else {
            dispatch(error(result.errMsg));
        }
    }
}

export const getMeijuCount = (url) => {
    return async dispatch => {
        const response = await ajax.get(url);
        const result = response.data;
        if (result.code === 0) {
            dispatch(receive_meiju_count(result.data.count));
        } else {
            dispatch(error(result.errMsg));
        }
    }
}

export const meijuComment = (obj) => {
    return async dispatch => {
        const closeMsg = message.loading('正在评论...', 0);
        const response = await ajax.post('/api/meiju/comment', obj);
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            message.success('评论成功！')
            dispatch(comment_meiju_success(result.data));
        } else {
            dispatch(error(result.errMsg));
        }
    }
}

export const deleteMeijuComment = (obj) => {
    return async dispatch => {
        const closeMsg = message.loading('正在删除...', 0);
        const response = await ajax.post('/api/meiju/delComment', obj);
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            message.success('删除成功！')
            dispatch(comment_meiju_delete_success(result.data));
        } else {
            dispatch(error(result.errMsg));
        }
    }
}

export const meijuAwesome = (obj) => {
    return async dispatch => {
        const response = await ajax.post('/api/meiju/awesome', obj);
        const result = response.data;
        if (result.code === 0) {
            dispatch(receive_meiju_awesome_result(result.data));
        } else {
            dispatch(error(result.errMsg));
        }
    }
}

export const meijuReplay = (obj) => {
    return async dispatch => {
        const closeMsg = message.loading('正在回复...', 0);
        const response = await ajax.post('/api/meiju/replay', obj);
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            message.success('回复成功！')
            dispatch(receive_meiju_replay_result(result.data));
        } else {
            dispatch(error(result.errMsg));
        }
    }
}

export const queryUserExist = (username) => {
    return async dispatch => {
        dispatch(user_exist_loading(true));
        const response = await ajax.get('/api/hasuser', {username});
        const result = response.data;
        if (result.code === 0) {
            dispatch(receive_user_exist(result.data));
        } else {
            dispatch(error(result.errMsg));
        }
        dispatch(user_exist_loading(false));
    }
}

export const login = (userObj) => {
    return async dispatch => {
        const closeMsg = message.loading('正在登录，请稍后...', 0);
        const response = await ajax.post('/api/login', userObj);
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            message.success('登录成功！', 2);
            cookie.setCookies(result.data);
            dispatch(login_success(true));
            dispatch(get_user_cookie(cookie.parseToObj(result.data)));
        } else {
            message.error(result.errMsg);
        }
    }
}

export const register = (userObj) => {
    return async dispatch => {
        const closeMsg = message.loading('正在注册，请稍后...', 0);
        const response = await ajax.post('/api/register', userObj);
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            message.success('注册成功！已为您自动登录！', 2);
            cookie.setCookies(result.data);
            dispatch(login_success(true));
            dispatch(get_user_cookie(cookie.parseToObj(result.data)));
        } else {
            if (result.code === 1) {
                dispatch(receive_user_exist(true));
            }
            message.error(result.errMsg);
        }
    }
}

export const signOut = () => {
    return async dispatch => {
        const closeMsg = message.loading('正在退出，请稍后...', 0);
        const response = await ajax.post('/api/signout');
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            message.success('退出成功，期待下次与您相遇！');
            cookie.clearCookies();
            //重置登录成功状态
            dispatch(login_success(false));
            dispatch(get_user_cookie({}))
        } else {
            message.error(result.errMsg);
        }
    }
}

export const getUserCookie = () => {
    return dispatch => {
        const cookieObj = cookie.parseToObj();
        dispatch(get_user_cookie(cookieObj));
    }
}

export const star = (meijuId) => {
    return async dispatch => {
        const closeMsg = message.loading('正在收藏...', 0);
        const response = await ajax.post('/api/star', {meijuId});
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            cookie.setCookieByName('favorates', result.data);
            const cookieObj = cookie.parseToObj();
            dispatch(get_user_cookie(cookieObj));
            message.success('收藏成功！');
        } else {
            message.error(result.errMsg);
        }
    }
}

export const cancelStar = (meijuId) => {
    return async dispatch => {
        const closeMsg = message.loading('正在取消收藏...', 0);
        const response = await ajax.post('/api/cancelStar', {meijuId});
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            cookie.setCookieByName('favorates', result.data);
            const cookieObj = cookie.parseToObj();
            dispatch(get_user_cookie(cookieObj));
            message.success('取消收藏成功！');
        } else {
            message.error(result.errMsg);
        }
    }
}

export const comment = (content) => {
    return async dispatch => {
        const closeMsg = message.loading('正在评论...', 0);
        const response = await ajax.post('/api/comment', {content});
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            dispatch(comment_success(result.data));
            message.success('评论成功！感谢您的建议！');
        } else {
            message.error(result.errMsg);
        }
    }
}

export const deleteComment = (_id) => {
    return async dispatch => {
        const closeMsg = message.loading('正在删除...', 0);
        const response = await ajax.post('/api/delComment', {_id});
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            dispatch(delete_comment_success(result.data));
            message.success('删除成功！');
        } else {
            message.error(result.errMsg);
        }
    }
}

export const getCommentList = (page = 0) => {
    return async dispatch => {
        dispatch(is_loading(true));
        const response = await ajax.get('/api/comment/' + page);
        const result = response.data;
        if (result.code === 0) {
            dispatch(receive_comment_list(result.data));
        } else {
            dispatch(error(result.errMsg));
        }
        dispatch(is_loading(false));
    }
}

export const getCommentCount = () => {
    return async dispatch => {
        const response = await ajax.get('/api/commentCount');
        const result = response.data;
        if (result.code === 0) {
            dispatch(receive_comment_count(result.data.count));
        } else {
            dispatch(error(result.errMsg));
        }
    }
}

export const awesome = (commentId, clientIP) => {
    return async dispatch => {
        const response = await ajax.post('/api/awesome', {commentId, clientIP});
        const result = response.data;
        if (result.code === 0) {
            dispatch(receive_awesome_result(result.data));
        } else {
            dispatch(error(result.errMsg));
        }
    }
}

export const replay = (replayObj) => {
    return async dispatch => {
        const closeMsg = message.loading('正在回复...', 0);
        const response = await ajax.post('/api/replay', replayObj);
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            dispatch(replay_success(result.data));
            message.success('回复成功！');
        } else {
            message.error(result.errMsg);
        }
    }
}

export const getClientIP = () => {
    return async dispatch => {
        const response = await ajax.get('https://api.ttt.sh/ip/qqwry/');
        const result = response.data;
        if (result.code === 200) {
            dispatch(receive_client_ip(result));
        } else {
            dispatch(error(result.errMsg));
        }
    }
}