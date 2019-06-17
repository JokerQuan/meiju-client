import cookie from './cookie';

let privilege = {};

privilege.isAdmin = () => {
    const username = cookie.getCookieByName('username');
    if (username === 'Admin') {
        return true;
    }
    return false;
}


export default privilege;