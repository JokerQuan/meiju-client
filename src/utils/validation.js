const validation = {};

validation.checkUsername = (username) => {
    if (username === '') {
        return '用户名不能为空！';
    }
    if (username.indexOf(' ') !== -1) {
        return '用户名不能包含空格！';
    }
    return true;
}

validation.checkPassword = (password) => {
    if (password === '') {
        return '密码不能为空！';
    }
    if (password.indexOf(' ') !== -1) {
        return '密码不能包含空格！';
    }
    if (password.length < 6 || password.length > 16) {
        return '密码长度应该为6~16！';
    }
    return true;
}

export default validation;