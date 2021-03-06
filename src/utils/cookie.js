let cookie = {};

cookie.getCookieByName = (name) => {
    let value = '';
    if (!name || !document.cookie) return '';
    const KVs = document.cookie.split(';');
    /**
    foreach不能使用常规方法跳出循环，坑。。可以用every或some
    KVs.forEach(kv => {
        if (name === kv.trim().split('=')[0]) {
            return kv.trim().split('=')[1];
        }
    });
     */
    for (let i = 0; i < KVs.length; i++) {
        const kv = KVs[i].trim().split('=');
        if (name === kv[0]) {
            value = kv[1];
            break;
        }
    }
    return value;
}

cookie.setCookieByName = (name, value) => {
    const expires = 'expires=' + cookie.getCookieByName('userExpires') + ';';
    document.cookie = name+ '=' + value + ';' + expires + 'path=/';
}

cookie.setCookies = (obj, expiresdays = 7) => {
    //key=value
    let kvStr = '';

    //过期时间
    let d = new Date();
    d.setTime(d.getTime() + (expiresdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString() + ';';

    //每次只能设置一个key-value
    Object.keys(obj).forEach(key => {
        kvStr = key + '=' + obj[key] + ';'
        document.cookie = kvStr + expires + 'path=/';
    });

    //记录过期时间，方便获取
    document.cookie = 'userExpires=' + d.toUTCString() + ';' + expires + 'path=/';
}

cookie.parseToObj = () => {
    if (!document.cookie) return {};
    let cookieObj = {};
    const KVs = document.cookie.split(';');
    KVs.forEach(kv => {
        const key = kv.trim().split('=')[0];
        const value = kv.trim().split('=')[1];
        cookieObj[key] = value;
    });
    return cookieObj;
}

cookie.clearCookies = () => {
    const KVs = document.cookie.split(';');
	if(KVs) {
        KVs.forEach(kv => {
            document.cookie = kv.trim().split('=')[0] + '=0;expires=' + new Date(0).toUTCString()
        })
	}
}

export default cookie;