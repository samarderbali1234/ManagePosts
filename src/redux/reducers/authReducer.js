import { SET_ACCESS_TOKEN, SET_USER ,SET_USER_PAGES} from '../actions/authActions';

const initialState = {
    accessToken: null,
    user: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return { ...state, accessToken: action.payload };
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_USER_PAGES: // Nouveau cas pour stocker les pages
            return { ...state, pages: action.payload };
        default:
            return state;
    }
}