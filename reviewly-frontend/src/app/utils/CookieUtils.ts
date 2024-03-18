import Cookies, {CookieAttributes} from 'js-cookie';

export const setCookie = (name: string, value: string, options?: CookieAttributes) => {
    Cookies.set(name, value, options);
}

export const getCookie = (name: string): string => {
    return Cookies.get(name);
}

export const removeCookie = (name: string): void => {
    Cookies.remove(name);
}
