/**
 * 包含n个action creator
 * 异步action
 * 同步action
 */

import ajax from "../utils/ajax";
import { 
    RECEIVE_MEIJU_LIST,
    RECEIVE_CATEGORY,
    RECEIVE_MEIJU_COUNT,
    ERROR,
    IS_LOADING
} from "./action-types";

const receive_meiju_list = (meijuList) => ({type: RECEIVE_MEIJU_LIST, data: meijuList});
const receive_category = (category) => ({type: RECEIVE_CATEGORY, data: category});
const receive_meiju_count = (meijuCount) => ({type: RECEIVE_MEIJU_COUNT, data: meijuCount});
const error = (errMsg) => ({type: ERROR, data: errMsg});

const is_loading = (idLoading) => ({type: IS_LOADING, data: idLoading});

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
