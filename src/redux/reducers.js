/**
 * 包含n个reducer函数：根据老的state和指定的action返回一个新的state
 */
import {combineReducers} from 'redux'

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
    RECEIVE_CLIENT_IP,
    RECEIVE_TYPE_STATISTICS,
    RECEIVE_AREA_STATISTICS,
    RECEIVE_TAGS_STATISTICS
} from "./action-types";

const initMeijuList = [];
function meijuList(state = initMeijuList, action) {
    switch (action.type) {
        case RECEIVE_MEIJU_LIST:
            return action.data;
        case COMMENT_MEIJU_SUCCESS:
            return state.map((meiju) => {
                return meiju._id === action.data._id ? action.data : meiju;
            });
        case COMMENT_MEIJU_DELETE_SUCCESS:
            return state.map((meiju) => {
                return meiju._id === action.data._id ? action.data : meiju;
            });
        case RECEIVE_MEIJU_AWESOME_RESULT:
            return state.map((meiju) => {
                return meiju._id === action.data._id ? action.data : meiju;
            });
        case RECEIVE_MEIJU_REPLAY_RESULT:
            return state.map((meiju) => {
                return meiju._id === action.data._id ? action.data : meiju;
            });
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
        case DELETE_COMMENT_SUCCESS:
            for (let i = 0; i < state.length; i++) {
                if(state[i]._id === action.data) {
                    state.splice(i, 1);
                    break;
                }
            }
            return [...state];
        case REPLAY_SUCCESS:
            for (let i = 0; i < state.length; i++) {
                if(state[i]._id === action.data._id) {
                    state.splice(i, 1, action.data);
                    break;
                }
            }
            return [...state];
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

const initStatistics = {
    typeData : [],
    areaData : [],
    tagsData : []
};
function statistics (state = initStatistics, action) {
    switch (action.type) {
        case RECEIVE_TYPE_STATISTICS:
            return {...state, ...{typeData : action.data}};
        case RECEIVE_AREA_STATISTICS:
            return {...state, ...{areaData : action.data}};
        case RECEIVE_TAGS_STATISTICS:
            return {...state, ...{tagsData : action.data}};
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
    clientIP,
    statistics
}); //向外暴露的结构：{meijuList:[], category:{}, count: 0}