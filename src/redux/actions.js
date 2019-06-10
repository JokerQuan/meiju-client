/**
 * 包含n个action creator
 * 异步action
 * 同步action
 */
import { message } from "antd";

import ajax from "../utils/ajax";
import { 
    RECEIVE_MEIJU_LIST,
    RECEIVE_CATEGORY,
    RECEIVE_MEIJU_COUNT,
    ERROR,
    IS_LOADING,
    RECEIVE_USER_EXIST,
    USER_EXIST_LOADING
} from "./action-types";

const receive_meiju_list = (meijuList) => ({type: RECEIVE_MEIJU_LIST, data: meijuList});
const receive_category = (category) => ({type: RECEIVE_CATEGORY, data: category});
const receive_meiju_count = (meijuCount) => ({type: RECEIVE_MEIJU_COUNT, data: meijuCount});

const is_loading = (idLoading) => ({type: IS_LOADING, data: idLoading});

const receive_user_exist = (userExist) => ({type: RECEIVE_USER_EXIST, data: userExist});
const user_exist_loading = (userExistLoading) => ({type: USER_EXIST_LOADING, data: userExistLoading});

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

export const register = (userObj) => {
    return async dispatch => {
        const closeMsg = message.loading('注册中，请稍后...', 0);
        const response = await ajax.post('/api/register', userObj);
        closeMsg();
        const result = response.data;
        if (result.code === 0) {
            message.success('注册成功！已为您自动登录！', 2);
        } else {
            if (result.code === 1) {
                dispatch(receive_user_exist(true));
            }
            message.error(result.errMsg);
        }
    }
}