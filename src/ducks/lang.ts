import * as moment from 'moment';

const CHANGE_LOCALE = 'CHANGE_LOCALE';

const initialState = 'en';

export default function(state = initialState, action: any) {
    return action.type === CHANGE_LOCALE ? action.payload : state;
}

export const changeLocale = (lang: string) => {
    const locale = lang.substr(0, 2);
    moment.locale(lang);
    localStorage.setItem('lang', lang);

    return {
        type: CHANGE_LOCALE,
        payload: locale,
    };
};
