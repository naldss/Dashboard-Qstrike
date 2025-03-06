export function setToken(key, value, days) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    const item = {
        value: value,
        expires: expires.toUTCString(),
    };
    localStorage.setItem(key, JSON.stringify(item));
}

export function getToken(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now > new Date(item.expires)) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}