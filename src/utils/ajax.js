import axios from "axios";

const ajax = {};

ajax.get = (url, params = {}) => {
    let paramsStr = ''
    Object.keys(params).forEach(key => {
        paramsStr += key + '=' + params[key] + '&';
    });

    if (paramsStr !== '') {
        paramsStr = paramsStr.substring(0, paramsStr.lastIndexOf('&'));
        url = url + '?' + paramsStr;
    }

    return axios.get(url);
}

ajax.post = (url, params = {}) => {
    return axios.post(url, params);
}

export default ajax;