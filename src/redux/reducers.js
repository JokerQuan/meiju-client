/**
 * 包含n个reducer函数：根据老的state和指定的action返回一个新的state
 */
import {combineReducers} from 'redux'

import { 
    RECEIVE_MEIJU_LIST,
    RECEIVE_CATEGORY,
    RECEIVE_MEIJU_COUNT,
    ERROR,
    IS_LOADING,
    RECEIVE_USER_EXIST,
    USER_EXIST_LOADING,
    LOGIN_SUCCESS,
    GET_USER_COOKIE,
    COMMENT_SUCCESS,
    RECEIVE_COMMENT_LIST,
    RECEIVE_COMMENT_COUNT,
    RECEIVE_AWESOME_RESULT,
    RECEIVE_CLIENT_IP
} from "./action-types";

const initMeijuList = [];
function meijuList(state = initMeijuList, action) {
    switch (action.type) {
        case RECEIVE_MEIJU_LIST:
            return action.data;
        case ERROR:
            return action.data;
        default:
            return state;
    }
}

const initCategory = {
    tags : [],
    areas : [],
    types : []
};
function category(state = initCategory, action) {
    switch (action.type) {
        case RECEIVE_CATEGORY:
            return action.data;
        case ERROR:
            return action.data;
        default:
            return state;
    }
}

const initCount = 0;
function meijuCount(state = initCount, action) {
    switch (action.type) {
        case RECEIVE_MEIJU_COUNT:
            return action.data;
        case ERROR:
            return action.data;
        default:
            return state;
    }
}

const initLoading = false;
function isLoading(state = initLoading, action) {
    switch (action.type) {
        case IS_LOADING:
            return action.data;
        default:
            return state;
    }
}

const initUserExist = true;
function userExist(state = initUserExist, action) {
    switch (action.type) {
        case RECEIVE_USER_EXIST:
            return action.data;
        case ERROR:
            return action.data;
        default:
            return state;
    }
}

const initUserExistLoading = false;
function userExistLoading(state = initUserExistLoading, action) {
    switch (action.type) {
        case USER_EXIST_LOADING:
            return action.data;
        default:
            return state;
    }
}

const initLoginSuccess = false;
function loginSuccess(state = initLoginSuccess, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

const initUserCookie = {};
function userCookie(state = initUserCookie, action) {
    switch (action.type) {
        case GET_USER_COOKIE:
            return action.data;
        default:
            return state;
    }
}


const initCommentList = [];
function commentList(state = initCommentList, action) {
    switch (action.type) {
        case COMMENT_SUCCESS:
            return [action.data, ...state];
        case RECEIVE_COMMENT_LIST:
            return action.data;
        case RECEIVE_AWESOME_RESULT:
            return state.map(comment => {
                if (comment._id === action.data._id) {
                    comment.awesome = action.data.awesome;
                }
                return comment;
            });
        default:
            return state;
    }
}

const initCommentCount = 0;
function commentCount(state = initCommentCount, action) {
    switch (action.type) {
        case RECEIVE_COMMENT_COUNT:
            return action.data;
        case ERROR:
            return action.data;
        default:
            return state;
    }
}

const initClientIP = '127.0.0.1';
function clientIP(state = initClientIP, action) {
    switch (action.type) {
        case RECEIVE_CLIENT_IP:
            return action.data;
        default:
            return state;
    }
}

export default combineReducers({
    meijuList,
    category,
    meijuCount,
    isLoading,
    userExist,
    userExistLoading,
    loginSuccess,
    userCookie,
    commentList,
    commentCount,
    clientIP
}); //向外暴露的结构：{meijuList:[], category:{}, count: 0}