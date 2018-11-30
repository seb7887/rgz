import cookie from 'js-cookie';

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, { expires: 7, path: '/' });
  }
}

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, { expires: 7 });
  }
}

export const getCookie = (key) => {
  return cookie.get(key);
}
