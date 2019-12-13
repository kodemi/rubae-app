import { combineReducers } from 'redux';

import auth, { LOGOUT } from './auth';
import bookedServices from './bookedServices';
import lang from './lang';
import view from './view';

const appReducer = combineReducers({
    auth,
    bookedServices,
    lang,
    view,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === LOGOUT) {
        state = undefined;
        localStorage.removeItem('reduxState');
    }
    return appReducer(state, action);
};

export default rootReducer;
