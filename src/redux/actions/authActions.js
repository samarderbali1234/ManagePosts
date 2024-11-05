export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_USER = 'SET_USER';
export const SET_USER_PAGES = 'SET_USER_PAGES';
export const setAccessToken = (token) => ({
    type: SET_ACCESS_TOKEN,
    payload: token
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const setUserPages = (pages) => ({
    type: SET_USER_PAGES,
    payload: pages,
});