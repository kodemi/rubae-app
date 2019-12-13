import { push, replace } from 'connected-react-router';
import { authenticate, logout as apiLogout } from '../api';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
const RESET_ERROR = 'RESET_ERROR';

const initialState = {
    authenticated: false,
    docId: null,
    error: null,
    loading: false,
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                docId: action.payload.docId,
                loading: false,
                error: null,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };
        case LOGOUT:
            return {
                ...state,
                authenticated: false,
                docId: null,
                error: null,
            };
        case RESET_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const login = (username: string, password: string) => (
    dispatch: any
) => {
    dispatch({
        type: LOGIN_REQUEST,
    });
    authenticate(username, password)
        .then((docId: string) => {
            dispatch(loginSuccess(docId));
            dispatch(replace('/'));
        })
        .catch((error) => {
            dispatch({
                payload: {
                    error,
                },
                type: LOGIN_ERROR,
            });
        });
};

export const loginSuccess = (docId: string) => ({
    payload: docId,
    type: LOGIN_SUCCESS,
});

export const logout = () => {
    apiLogout();
    return {
        type: LOGOUT,
    };
};

export const logoutAndRedirectToLogin = () => (dispatch: any) => {
    dispatch(logout());
    dispatch(push('/login'));
};

export const resetError = () => ({
    type: RESET_ERROR,
});
